import { parse } from 'csv-parse';
import multer from 'multer';
import prisma from '../config/prisma.js';

// Multer configurato in memoria — il file non tocca il disco
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Solo file CSV sono accettati'));
    }
  },
});

// POST /api/v1/csv/import
export const importArticlesFromCsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file caricato' });
    }

    // Parsing del CSV dal buffer in memoria
    const records = await new Promise((resolve, reject) => {
      parse(req.file.buffer, {
        columns: true,          // prima riga = intestazioni
        skip_empty_lines: true,
        trim: true,             // rimuove spazi bianchi
        delimiter: ';',
        bom: true
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    if (records.length === 0) {
      return res.status(400).json({ error: 'Il file CSV è vuoto' });
    }

    const imported = [];
    const skipped = [];

    for (const record of records) {
      const { name, category, unit, price } = record;

      // Valida che i campi obbligatori siano presenti
      if (!name || !category || !unit || !price) {
        skipped.push({ record, reason: 'Campi obbligatori mancanti (name, category, unit, price)' });
        continue;
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        skipped.push({ record, reason: 'Prezzo non valido' });
        continue;
      }

      imported.push({
        tenantId: req.tenantId,
        name,
        category,
        unit,
        price: parsedPrice,
        active: true,
      });
    }

    // Inserimento massivo in una sola query
    const result = await prisma.article.createMany({
      data: imported,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: `Import completato`,
      imported: result.count,
      skipped: skipped.length,
      skippedDetails: skipped,
    });

  } catch (error) {
    console.error('importArticlesFromCsv error:', error);
    res.status(500).json({ error: "Errore durante l'import CSV" });
  }
};