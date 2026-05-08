import prisma from '../config/prisma.js';

// GET /api/v1/clients
export const getClients = async (req, res) => {
  try {
    const { search } = req.query;

    const where = { tenantId: req.tenantId };

    if (search) {
      where.nameOrCompany = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const clients = await prisma.client.findMany({
      where,
      orderBy: { nameOrCompany: 'asc' },
      include: {
        _count: { select: { quotes: true } },
      },
    });

    res.json({ clients });
  } catch (error) {
    console.error('getClients error:', error);
    res.status(500).json({ error: 'Errore nel recupero clienti' });
  }
};

// GET /api/v1/clients/:id
export const getClientById = async (req, res) => {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
      include: {
        quotes: {
          orderBy: { date: 'desc' },
          select: {
            id: true,
            number: true,
            date: true,
            status: true,
            totalFinal: true,
          },
        },
      },
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente non trovato' });
    }

    res.json({ client });
  } catch (error) {
    console.error('getClientById error:', error);
    res.status(500).json({ error: 'Errore nel recupero cliente' });
  }
};

// POST /api/v1/clients
export const createClient = async (req, res) => {
  try {
    const { nameOrCompany, address, country, city, phone, email, notes } = req.body;

    const client = await prisma.client.create({
      data: {
        tenantId: req.tenantId,
        nameOrCompany,
        address: address || null,
        phone: phone || null,
        email: email || null,
        notes: notes || null,
        city: city || null,
        country: country || 'Italia',
      },
    });

    res.status(201).json({ client });
  } catch (error) {
    console.error('createClient error:', error);
    res.status(500).json({ error: 'Errore nella creazione cliente' });
  }
};

// PUT /api/v1/clients/:id
export const updateClient = async (req, res) => {
  try {
    const existing = await prisma.client.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Cliente non trovato' });
    }

    const { nameOrCompany, address, country, city, phone, email, notes } = req.body;

    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: {
        ...(nameOrCompany !== undefined && { nameOrCompany }),
        ...(address !== undefined && { address }),
        ...(country !== undefined && { country: country || 'Italia' }),
        ...(city !== undefined && { city }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.json({ client });
  } catch (error) {
    console.error('updateClient error:', error);
    res.status(500).json({ error: "Errore nell'aggiornamento cliente" });
  }
};

// DELETE /api/v1/clients/:id
export const deleteClient = async (req, res) => {
  try {
    const existing = await prisma.client.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Cliente non trovato' });
    }

    await prisma.client.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Cliente eliminato' });
  } catch (error) {
    console.error('deleteClient error:', error);
    res.status(500).json({ error: "Errore nell'eliminazione cliente" });
  }
};