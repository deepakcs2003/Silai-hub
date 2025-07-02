
# GuddiSilai 👗✨

**GuddiSilai** is an open-source tailoring platform where users can book custom stitching services for blouses, lehengas, and dresses. Users can view designs, add personalized measurements, and track their orders online. Inspired by local silai shops, now powered by React and Node.js.

> “Silai ki duniya, ab online.” — *GuddiSilai*

---

## 🌐 Live Demo

🚧 www.guddisilai.shop

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/16c77315-aa49-4a2b-99af-8e5416ec2eec)
![image](https://github.com/user-attachments/assets/884fe2e3-3c32-4da3-a719-6db00d740cb4)
![image](https://github.com/user-attachments/assets/c0a0b299-4149-4009-b22c-5054aadf7a5b)
![image](https://github.com/user-attachments/assets/ae599456-f358-43dc-a71a-11d4903eb16e)
![image](https://github.com/user-attachments/assets/46b2c8ce-6c4b-4e41-8137-9e4d1ee12382)

---

## ✨ Key Features

- 👗 Blouse, Lehenga, Dress stitching booking
- 🧵 Design browsing and custom orders
- 📐 Measurements and personalization
- 🔐 Google OAuth login
- ⚙️ Admin panel for order/design management (WIP)
- 🔍 SEO-ready with sitemap generator

---

## 🛠 Tech Stack

| Layer        | Tech Used                   |
|--------------|-----------------------------|
| Frontend     | React.js, Tailwind CSS      |
| Backend      | Node.js, Express.js         |
| Authentication | JWT, Google OAuth         |
| Database     | MongoDB (Cloud via Atlas)   |
| Deployment   | Vercel (Frontend), Render (Backend) |

---
# 🎨 GuddiSilai Color Palette

This color palette is crafted to represent **royalty**, **affordability**, and the essence of **blouse stitching and tailoring** for the **GuddiSilai** brand.

---

## 🌟 Brand Colors

| Color Name        | Hex Code   | Preview | Usage |
|-------------------|------------|---------|--------|
| **Royal Maroon**  | `#800000`  | ![#800000] | Primary brand color, buttons, headers |
| **Soft Peach**    | `#FFE5B4`  | ![#FFE5B4] | Backgrounds, soft UI sections |
| **Gold Dust**     | `#D4AF37`  | ![#D4AF37] | Borders, icons, decorative accents |
| **Slate Grey**    | `#4A4A4A`  | ![#4A4A4A] | Main text color |
| **Thread Blue**   | `#6C8CD5`  | ![#6C8CD5] | Hover effects, buttons, highlights |

---

## 🧵 Usage in CSS

```css
:root {
  --color-maroon: #800000;
  --color-peach: #FFE5B4;
  --color-gold: #D4AF37;
  --color-grey: #4A4A4A;
  --color-thread-blue: #6C8CD5;
}

/* Example Usage */
.button-primary {
  background-color: var(--color-maroon);
  color: white;
}

.section-background {
  background-color: var(--color-peach);
}

.text-main {
  color: var(--color-grey);
}

## 📂 Project Structure

```

guddisilai/
├── backend/                # Express Backend
│   ├── Config/
│   ├── Controller/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   └── app.js
│
├── public/                 # Public assets
│
├── src/                    # React Frontend
│   ├── Assist/
│   ├── Common/
│   ├── Components/
│   ├── Context/
│   ├── Pages/
│   ├── Routers/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── generate-sitemap.js
├── tailwind.config.js
├── vercel.json

````

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/deepakcs2003/guddisilai.git
cd guddisilai
````

---

### 2️⃣ Backend Setup (`/backend`)

```bash
cd backend
npm install
cp .env.example .env  # Fill your credentials
npm start
```

> Backend runs on: `http://localhost:5000`

---

### 3️⃣ Frontend Setup (`/src` root)

```bash
npm install
cp .env.example .env  # Frontend Google Client ID
npm start
```

> Frontend runs on: `http://localhost:3000`

---

## 🔐 Environment Variables

### 📁 `/backend/.env.example`

```env
# Server Port
PORT=5000

# MongoDB URI
MONGO_URI=your_mongodb_uri

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Google OAuth Config
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

### 📁 `/src/.env.example`

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

✅ Add `.env` to `.gitignore` in both places!

---

## 🗺 SEO: Sitemap Generator

You can run:

```bash
node generate-sitemap.js
```

> It auto-generates sitemap based on route paths for search engines.

---

## 🤝 Contributing

We welcome contributions!

1. Fork this repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request ✅

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Maintainer

**Deepak Vishwakarma**
📸 Instagram: [@guddisilai](https://instagram.com/guddisilai)

---

> 🧵 **“Every stitch tells a story.” — GuddiSilai**

````

---

### ✅ Also Create These Files in Your Repo:

#### 🔹 `/backend/.env.example`
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
````

#### 🔹 `/src/.env.example`

```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
```
