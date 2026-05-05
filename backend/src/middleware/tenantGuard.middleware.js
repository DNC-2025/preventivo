export const tenantGuard = (req, res, next) => {
  if (!req.user?.tenantId) {
    return res.status(403).json({ error: "Tenant non trovato" });
  }

  req.tenantId = req.user.tenantId;
  next();
};
