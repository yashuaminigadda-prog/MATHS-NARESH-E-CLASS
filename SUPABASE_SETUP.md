# 🚀 Supabase Backend Setup Guide — Maths Naresh eClass

Supabase backend setup is completely ready in the project. Follow these 3 simple steps to connect your Supabase database:

---

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and click **"Start your project"**.
2. Sign in with GitHub or your email.
3. Click **"New Project"**, give it a name (e.g. `maths-naresh-eclass`), choose a region (e.g. `Mumbai (ap-south-1)`), and set a database password.

---

### Step 2: Run the SQL Schema (One Click)
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation bar (icon `>_`).
2. Click **"New Query"**.
3. Open the file [`supabase/schema.sql`](file:///c:/Users/navee/OneDrive/Desktop/maths%20acdemy/supabase/schema.sql) in this repository, copy all contents, paste it into the SQL Editor, and click **Run**.
4. This will automatically create:
   - `contact_inquiries` table (records all student doubts and inquiries)
   - `study_resources` table (manages PDFs, formula sheets, handwritten notes)
   - `video_lessons` table (YouTube integration and lesson management)
   - `chapters` table (complete curriculum units and concepts)
   - `newsletter_subscribers` table (student updates list)
   - Row Level Security (RLS) policies allowing secure public reads and submissions

---

### Step 3: Add Your Keys to `.env`
1. In your Supabase Dashboard, go to **Project Settings** (gear icon at the bottom left) -> **API**.
2. Copy the **Project URL** (e.g. `https://xyzcompany.supabase.co`).
3. Copy the **Project API Keys** -> `anon` `public` key.
4. Open [`.env`](file:///c:/Users/navee/OneDrive/Desktop/maths%20acdemy/.env) in the project and paste them:

```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

5. Save the file and restart the dev server (`npm run dev`).

---

### Step 4: Administrator Account & Access
- The designated master administrator email is **`yashuaminigadda@gmail.com`** (along with `yashuaminigadda2@gmail.com`).
- In the Supabase Dashboard, under **Authentication** -> **Users**, you can add `yashuaminigadda@gmail.com` with a password, or sign in via Google OAuth.
- On the website at `/admin`, signing in with this email grants full administrative privileges to **Add** and **Delete** study notes, PDFs, YouTube video lectures, student inquiries, and newsletter subscribers.
- In demo/offline mode, click **"1-Click Yashu (Admin Access)"** on `/admin` to immediately enter the admin desk with full edit privileges!

---

### 🛡️ Built-in Offline Fallback
- Even before you paste your keys, the website **never breaks** — it automatically uses local offline fallback data.
- Once connected, student contact inquiries and dynamic study materials sync live with your Supabase PostgreSQL cloud database!
