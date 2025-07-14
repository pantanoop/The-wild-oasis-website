
# 📌 The Wild Oasis

## 🏞️ Welcome to Paradise

**The Wild Oasis** is a luxury cabin booking web application where users can explore and reserve cozy cabins located in beautiful destinations like the Italian Dolomites.  
Guests can filter cabins, view details, make secure reservations with online payments, and receive instant confirmation emails.

---

## 🚀 Live Demo

[👉 Visit The Wild Oasis](https://the-wild-oasis-eight-liart.vercel.app/)

---

## ⚙️ Tech Stack

- **Frontend:** Next.js (App Router, React Server Components), Tailwind CSS
- **Backend:** Supabase (handles database, authentication, and storage)
- **Database:** Supabase Postgres (managed PostgreSQL)
- **Authentication:** Supabase Auth with Google OAuth
- **Payments:** Razorpay Payment Gateway (client-side integration)
- **Email Service:** Resend (automated booking confirmation emails)
- **Hosting:** Vercel (full-stack deployment)
- **Date Utilities:** date-fns for date calculations
- **File Storage:** Supabase Storage for cabin images

---

## ✨ Key Features

✅ Browse luxury cabins with beautiful imagery and details  
✅ Filter cabins by guest capacity  
✅ Secure Google OAuth login (authenticated users only)  
✅ Integrated Razorpay payment gateway  
✅ Automated booking confirmation emails with Resend  
✅ Personalized guest dashboard with:

- **Home:** View next upcoming reservation
- **Reservations:** See all past and upcoming stays
- **Guest Profile:** Manage user profile (accessible only when logged in)
- Edit upcoming reservation dates (stay length cannot exceed original nights)
- Rebook past cabins easily
- Cancel/delete reservations anytime
- Fully responsive design for all devices

---

## 📁 Folder Structure

```
📦 the-wild-oasis
├── 📁 app
│   ├── 📁 components         # Reusable UI components
│   ├── 📁 lib                # Supabase client, helpers, Razorpay utils
│   ├── 📁 styles             # Global & component styles (Tailwind CSS)
│   ├── 📁 about              # About page route
│   ├── 📁 account
│   │   ├── 📁 profile        # Guest Profile page
│   │   ├── 📁 reservations   # Reservations list page
│   │   └── 📁 reservations/edit  # Edit reservation page
│   ├── 📁 api                # Optional API routes (if needed)
│   ├── 📁 cabins
│   │   ├── 📁 [cabinId]      # Dynamic route for cabin details
│   │   └── 📁 thankyou       # Thank you page after booking
│   ├── 📁 login              # Login page
│   ├── 📄 errors.js          # Global error boundary
│   ├── 📄 layout.js          # Root layout (wraps all pages)
│   ├── 📄 loading.js         # Loading state
│   ├── 📄 not-found.js       # 404 page
│   └── 📄 page.js            # Root route (homepage)
├── 📄 .env.local             # Environment variables
├── 📄 tailwind.config.js     # Tailwind CSS config
├── 📄 postcss.config.js      # PostCSS config
├── 📄 next.config.js         # Next.js config
├── 📄 package.json           # Project dependencies & scripts
├── 📄 README.md              # Project overview
├── 📁 public                 # Static assets (images, logos)
├── 📁 node_modules           # Installed dependencies
└── 📄 .gitignore             # Git ignore rules
```

✅ **Key Notes**  
- `/app` uses the **Next.js App Router** with file-based routing.
- `/app/components` contains shared React UI components (e.g., `Header`, `Footer`, `CabinCard`, `ReservationCard`, `DateSelector`).
- `/app/lib` contains the Supabase client, auth helpers, and Razorpay utilities.
- `/app/api` is optional — most functionality uses Supabase SDK directly.
- Special root files handle layout, global error boundaries, loading states, 404s, and the landing page.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret

AUTH_GOOGLE_ID=your_google_oauth_id
AUTH_GOOGLE_SECRET=your_google_oauth_secret

RAZORPAY_ID_KEY=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=same_as_RAZORPAY_ID_KEY

RESEND_API_KEY=your_resend_api_key
```

---

## 🛠️ Getting Started Locally

1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/the-wild-oasis.git
cd the-wild-oasis
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Add your environment variables** (`.env.local`)

4️⃣ **Run the project locally**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🚀

---

## 📡 Data Flow

- All user authentication, database queries, and storage are handled directly via **Supabase SDK**.
- Payments are processed client-side using the **Razorpay** SDK.
- Booking confirmation emails are sent through **Resend**.
- Optional API routes can be added under `/app/api` using **Next.js Route Handlers**, but most logic runs serverless via Supabase.

---

## 🫧 Screenshots

<p align="center">
  <img src="/screenshots/home.png" alt="Hero Section" width="600"/>
  <br/>
  <img src="/screenshots/cabinList.png" alt="Cabin Listings" width="600"/>
  <br/>
  <img src="/screenshots/RazorPaygateway.png" alt="Payment Gateway" width="600"/>
  <br/>
  <img src="/screenshots/email.png" alt="Confirmation Email" width="600"/>
  <br/>
  <img src="/screenshots/reservationList.png" alt="Reservation Listing" width="600"/>
  <br/>
  <img src="/screenshots/editReservation.png" alt="Reservation Edit" width="600"/>
  <br/>
  <img src="/screenshots/about.png" alt="About Wild Oasis" width="600"/>
</p>

---

## 🙋‍♂️ Contact

**Created by:** Anoop Pant  
**Email:** pantanoop63@gmail.com  
**GitHub:** [@pantanoop](https://github.com/pantanoop)

---

## 📄 License

This project is open source and free to use for educational purposes.  
Feel free to fork, learn, and contribute!

---

## 🌟 Enjoy your stay at The Wild Oasis!

