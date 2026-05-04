export const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend Preventivo API funzionante",
  });
};