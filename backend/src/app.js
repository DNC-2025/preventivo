import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkAuth } from "./middleware/clerkAuth.middleware.js";
import { API_PREFIX } from './config/constants.js'
// import { version } from "react";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(clerkAuth)

app.use('${API_PREFIX}/auth',     (await import('./routes/auth.routes.js')).default)
app.use('${API_PREFIX}/quotes',   (await import('./routes/quotes.routes.js')).default)
app.use('${API_PREFIX}/clients',  (await import('./routes/clients.routes.js')).default)
app.use('${API_PREFIX}/articles', (await import('./routes/articles.routes.js')).default)
app.use('${API_PREFIX}/pdf',      (await import('./routes/pdf.routes.js')).default)
app.use('${API_PREFIX}/admin',    (await import('./routes/admin.routes.js')).default)
app.use('${API_PREFIX}/csv',      (await import('./routes/csv.routes.js')).default)

app.get("${API_PREFIX}/health", (req, res) => {
  res.json({
    status: "ok",
    version: "v1"
  });
});

export default app;
