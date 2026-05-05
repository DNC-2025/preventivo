# App Preventivi SaaS

Piattaforma web per la creazione e gestione di preventivi professionali per artigiani e piccole imprese (parquettisti, muratori, controsoffittisti).

---

## Stack tecnologico

| Layer | Tecnologia |
|---|---|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express 5 |
| Database | PostgreSQL + Prisma 5 |
| Auth | Clerk |
| Deploy | Railway (BE + DB) + Netlify (FE) |

---

## Setup locale

### Prerequisiti
- Node.js v22+
- PostgreSQL installato e avviato
- Account Clerk su [clerk.com](https://clerk.com)

### Backend

```bash
cd backend
cp .env.example .env        # configura le variabili
npm install
npx prisma generate
npx prisma db push
npm run dev                 # avvia su http://localhost:3000
```

### Frontend

```bash
cd frontend
cp .env.example .env        # configura le variabili
npm install
npm run dev                 # avvia su http://localhost:5173
```

---

## Variabili d'ambiente

### backend/.env
```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/preventivo_db?schema=public"
CLERK_SECRET_KEY=sk_test_...
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### frontend/.env
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000/api
```

---

## Verifica che tutto funzioni

| Check | URL | Risposta attesa |
|---|---|---|
| Backend | http://localhost:3000/api/health | `{ status: "ok", database: "connected" }` |
| Frontend | http://localhost:5173 | Pagina con login Clerk |

---

## Struttura del progetto

```
preventivo/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # schema database
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js       # istanza PrismaClient
│   │   ├── controllers/        # logica delle route
│   │   ├── middlewares/        # auth, tenant, errori
│   │   ├── routes/             # endpoint API
│   │   └── services/           # logica di business
│   ├── app.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/                # chiamate al backend
        ├── components/         # componenti UI
        ├── context/            # stato globale
        ├── hooks/              # custom hooks
        ├── pages/              # pagine dell'app
        └── utils/              # funzioni helper
```

---

## Comandi utili Prisma

```bash
npx prisma generate       # rigenera il client dopo modifiche allo schema
npx prisma db push        # applica lo schema al database
npx prisma studio         # interfaccia visuale per il database
```

---

## Stato sviluppo

- [x] Settimana 1 — Setup e fondamenta
- [ ] Settimana 2 — Auth multi-tenant + schema DB completo
- [ ] Settimana 3 — Catalogo articoli
- [ ] Settimana 4 — Anagrafica clienti
- [ ] Settimana 5 — Logica calcolo + API preventivi
- [ ] Settimana 6 — UI creazione preventivo
- [ ] Settimana 7 — PDF + storico
- [ ] Settimana 8 — Admin + deploy finale
