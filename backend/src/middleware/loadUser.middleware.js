import { getAuth } from '@clerk/express'
import prisma from "../config/prisma.js";

export const loadUser = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ error: "Non autorizzato" });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Utente non trovato nel database" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Errore server" });
  }
};
