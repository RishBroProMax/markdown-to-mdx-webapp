# 📝 Markdown to MDX Web App

A powerful and minimal web application that converts `.md` (Markdown) files into `.mdx` format, enabling JSX support for React-based documentation and blogs.

---

## 🚀 Features

- ✅ Real-time Markdown to MDX conversion  
- ⚛️ JSX integration inside Markdown  
- 🎨 Code block syntax highlighting  
- 📁 Upload `.md` files for instant conversion  
- 💾 Copy and download `.mdx` output  
- 🌗 Light/Dark mode toggle  

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite  
- **Markdown Parsing**: `@mdx-js/mdx`, `remark`, `rehype`  
- **Code Highlighting**: `rehype-highlight`, `prismjs`  
- **Styling**: Tailwind CSS  

---

## 📁 Folder Structure

```plaintext
markdown-to-mdx-webapp/
├── public/
├── src/
│   ├── components/
│   │   ├── Editor.jsx
│   │   ├── Preview.jsx
│   │   └── Navbar.jsx
│   ├── utils/
│   │   └── mdToMdx.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## ⚙️ Installation & Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/markdown-to-mdx-webapp.git

# Navigate to the project folder
cd markdown-to-mdx-webapp

# Install dependencies
npm install

# Start the development server
npm run dev

```
