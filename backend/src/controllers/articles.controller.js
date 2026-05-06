import prisma from '../config/prisma.js';

// GET /api/v1/articles
export const getArticles = async (req, res) => {
  try {
    const { category, search, active } = req.query;

    const where = {
      tenantId: req.tenantId,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (active !== undefined) {
      where.active = active === 'true';
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    res.json({ articles });
  } catch (error) {
    console.error('getArticles error:', error);
    res.status(500).json({ error: 'Errore nel recupero articoli' });
  }
};

// GET /api/v1/articles/:id
export const getArticleById = async (req, res) => {
  try {
    const article = await prisma.article.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!article) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }

    res.json({ article });
  } catch (error) {
    console.error('getArticleById error:', error);
    res.status(500).json({ error: 'Errore nel recupero articolo' });
  }
};

// POST /api/v1/articles
export const createArticle = async (req, res) => {
  try {
    const { name, category, unit, price } = req.body;

    const article = await prisma.article.create({
      data: {
        tenantId: req.tenantId,
        name,
        category,
        unit,
        price: parseFloat(price),
        active: true,
      },
    });

    res.status(201).json({ article });
  } catch (error) {
    console.error('createArticle error:', error);
    res.status(500).json({ error: "Errore nella creazione articolo" });
  }
};

// PUT /api/v1/articles/:id
export const updateArticle = async (req, res) => {
  try {
    const existing = await prisma.article.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }

    const { name, category, unit, price, active } = req.body;

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(unit !== undefined && { unit }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(active !== undefined && { active }),
      },
    });

    res.json({ article });
  } catch (error) {
    console.error('updateArticle error:', error);
    res.status(500).json({ error: "Errore nell'aggiornamento articolo" });
  }
};

// DELETE /api/v1/articles/:id
export const deleteArticle = async (req, res) => {
  try {
    const existing = await prisma.article.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }

    await prisma.article.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Articolo eliminato' });
  } catch (error) {
    console.error('deleteArticle error:', error);
    res.status(500).json({ error: "Errore nell'eliminazione articolo" });
  }
};