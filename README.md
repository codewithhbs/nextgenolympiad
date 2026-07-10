# NextGen Olympiad Foundation — Website & Platform

Production-ready, CMS-driven platform for a school olympiad, built with **Next.js (App Router) + JavaScript**, **MongoDB/Mongoose**, **Tailwind CSS**, **Cloudinary**, and **Gmail SMTP**.

## Features

- **Public website** — home, about, olympiads/quiz, results lookup, gallery, FAQ, contact, and dynamic CMS/policy pages. Full SEO: dynamic metadata, Open Graph, canonical URLs, `robots.txt`, `sitemap.xml`, and JSON-LD structured data.
- **3 roles** — `super_admin`, `admin`, `school`.
- **School flow** — self-registration → email OTP verification → admin approval → login. Gated at every step.
- **School dashboard** — profile, students CRUD (with Cloudinary photos), view/search/print/export results, notifications, change password.
- **Result management** — admin uploads an Excel (`.xls/.xlsx`) per school. Rows are validated (auto-detects subject columns, computes total/percentage/medal), previewed via dry-run, then upserted. Results instantly appear in the school dashboard and are publicly checkable by student code.
- **~20-module admin panel** — dashboard, schools (approve/reject/suspend), students, results upload, all results, CMS pages, gallery, FAQs, testimonials, policies, media library, contact queries, notifications, site settings, SEO defaults, users, audit logs, review ranks.
- **Auth** — JWT access + refresh (httpOnly cookies, rotation), Edge middleware route protection, forgot/reset password, OTP verify, change password.
- **Security** — security headers + CSP, input sanitization (NoSQL-injection guard), rate limiting, role guards on every API route.
- **Email** — branded transactional emails (OTP, approval, rejection, reset, result published, contact reply) via nodemailer/Gmail.

## Tech

Next.js 15 · React 19 · Mongoose 8 · Tailwind 3 · lucide-react · jsonwebtoken · jose (edge) · bcryptjs · cloudinary · nodemailer · xlsx · zod

## Getting started

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
#   → fill MONGODB_URI, JWT secrets, SMTP_*, CLOUDINARY_*, NEXT_PUBLIC_SITE_URL

# 3. Seed super admin + defaults
npm run seed

# 4. Run
npm run dev            # http://localhost:3000
```

Default admin (change in `.env`): `admin@nextgenolympiad.in` / `Admin@12345`

## Environment variables

See `.env.example`. Key groups: `MONGODB_URI`, `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` (+ expiries), `SMTP_HOST/PORT/USER/PASS` + `MAIL_FROM`, `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET`, `SEED_ADMIN_*`, `NEXT_PUBLIC_SITE_URL`.

> Gmail SMTP needs an **App Password** (2FA enabled), not your login password.

## Results Excel format

First row = headers (case-insensitive). Recognized columns:

`StudentCode`, `StudentName` (or `Name`), `Class`, `Section`, one column per **subject** (e.g. `English`, `Mathematics`, `EVS`…), `Total`, `Max`/`MaxMarks`, `Rank`, `Session`.

Subject columns are auto-detected; totals/percentage/medals are computed if not supplied. Upload → **Validate** (dry-run preview) → **Publish**.

## Project structure

```
src/
  app/
    (site)/         public website + dynamic [slug] pages
    (auth)/         login, register, verify-otp, forgot/reset password
    admin/          ~20 admin modules (layout guards admin roles)
    school/         school dashboard (layout guards school role)
    api/            route handlers (auth, schools, students, results, cms, settings, contact, …)
    robots.js, sitemap.js, layout.js
  components/
    site/           header, footer, forms, result lookup, gallery, faq
    dashboard/      shell, nav, ui helpers, CrudManager, StudentsManager
    ui/             Button, Input, Card, Badge, Modal, Toast, Spinner
  lib/              db, auth, jwt, edgeAuth, cloudinary, mailer, excel, seo, validate, sanitize, rateLimit, otp, apiResponse, apiClient
  models/           User, School, Student, Result, Page, Faq, Gallery, Testimonial, Contact, Notification, Settings, Media, AuditLog
middleware.js       edge route protection
scripts/seed.js     seed super admin + defaults
```

## Notes

- Uses Next.js **Route Handlers** (`app/api/**`) rather than a separate Express server — idiomatic for the App Router. All security middleware (auth, sanitize, rate-limit, role guards) is applied per handler.
- A few admin modules (`users`, `media`, `audit-logs`) ship as working scaffolds where a dedicated list API isn't wired yet — the models and guards are in place, so adding the route is quick.
