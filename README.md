# বাজার দর — BazarDor 🛒

**BazarDor** is a modern and fast daily commodity market price tracking and analysis platform. It enables consumers to check reliable, daily market rates for essential household items—including rice, lentils, oil, fresh vegetables, fish, meat, and spices—and observe market price fluctuations at a glance.

🌐 **Live Demo:** [https://bazar-dor-two-mauve.vercel.app](https://bazar-dor-two-mauve.vercel.app)

---

## 🚀 5 Key Features

1. **Real-Time Market Prices & Animated Ticker (Live Marquee):**  
   Features a smooth, animated real-time ticker displaying trending commodity price updates, day-over-day changes, and price fluctuation percentages directly at the top of the application.

2. **Category-Based Filtering & Dynamic Product Pages:**  
   Users can effortlessly browse and filter essential goods across categories (Rice & Grains, Cooking Oil, Vegetables, Meat & Fish, Spices). Dedicated dynamic product routes provide in-depth information, including current pricing, previous rates, and unit breakdowns.

3. **Multi-Provider Authentication (Better Auth):**  
   Comprehensive authentication system supporting standard Email & Password registration along with one-click **Google** and **GitHub OAuth** sign-in and account linking.

4. **Live Profile Management & Real-Time Sync:**  
   Authenticated users can access their dedicated profile dashboard to update their display name. Any profile changes are instantly persisted to MongoDB and synced live across the header dropdown and user initial avatar without needing a page reload.

5. **Intuitive Toast Notifications & Custom 404 Experience:**  
   Features rich toast notifications providing instant user feedback across actions (login, signup, logout, and profile updates). Also includes an elegantly styled, user-friendly 404 Not Found error page for broken links.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (MongoDB Adapter, Google & GitHub OAuth)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Typography:** Google Fonts (`Noto Serif Bengali`, `Noto Sans Bengali`)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/dtech0/bazar-dor.git
cd bazar-dor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and add the following configuration:

```env
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_uri

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 👨‍💻 Author
- **Abdullah Al Sayed**
- GitHub: [@dtech0](https://github.com/dtech0)
