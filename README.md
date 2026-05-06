<div align="center">

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/logo.png" alt="AniPay Logo" height="180">
  </a>

  <br><br>

  # ✨ AniPay

  **Darling in the Franxx Inspired Payment Gateway**

  A beautiful, anime-themed multi-method payment page.<br>
  One config file. All your payment methods. Zero hassle.

  <br>

  [![Live Demo](https://img.shields.io/badge/Live-Demo-ff2a6d?style=for-the-badge&logo=vercel&logoColor=white)](https://shineii86.github.io/AniPay/)
  ![License](https://img.shields.io/github/license/Shineii86/AniPay?style=for-the-badge&color=5ffbf1)
  ![Last Commit](https://img.shields.io/github/last-commit/Shineii86/AniPay?style=for-the-badge&color=a855f7)
  ![Repo Size](https://img.shields.io/github/repo-size/Shineii86/AniPay?style=for-the-badge)
  [![Stars](https://img.shields.io/github/stars/Shineii86/AniPay?style=for-the-badge&color=ffdd00)](https://github.com/Shineii86/AniPay/stargazers)
  [![Forks](https://img.shields.io/github/forks/Shineii86/AniPay?style=for-the-badge)](https://github.com/Shineii86/AniPay/fork)

  <br>

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner1.png" alt="AniPay Banner" style="border-radius: 16px;">
  </a>

</div>

---

## 🎯 What is AniPay?

AniPay is a **single-page payment gateway** with an anime aesthetic. It supports **11 payment methods** across 3 categories — India, International, and Crypto. Everything is controlled by one config file, so you can fork it, edit `config.js`, and have your own payment page in minutes.

<table>
  <tr>
    <td align="center"><strong>🎨 Dark & Light Themes</strong></td>
    <td align="center"><strong>⚡ 11 Payment Methods</strong></td>
    <td align="center"><strong>🗂️ Category Filtering</strong></td>
    <td align="center"><strong>🍴 Fork-Friendly</strong></td>
  </tr>
  <tr>
    <td align="center">Toggle with one click<br>Persists via localStorage</td>
    <td align="center">UPI, PayPal, BTC, ETH<br>Binance, Ko-fi & more</td>
    <td align="center">India / International<br>Crypto tabs with counts</td>
    <td align="center">Edit one config file<br>No HTML knowledge needed</td>
  </tr>
</table>

---

## 📸 Screenshots

<div align="center">
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner2.png" alt="AniPay Dark Mode" width="48%" style="border-radius: 12px; margin: 4px;">
  </a>
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner3.png" alt="AniPay Features" width="48%" style="border-radius: 12px; margin: 4px;">
  </a>
</div>

---

## 🚀 Quick Start

```bash
# 1. Fork this repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/AniPay.git
cd AniPay

# 3. Open in browser (no build step needed)
open index.html
# or
python3 -m http.server 8000
```

**That's it.** No npm install. No build tools. Pure HTML + CSS + JS.

---

## ✨ Features

### 🎨 Design & UI

| Feature | Description |
|---------|-------------|
| **Dark / Light Theme** | Toggle with one click, remembers your choice |
| **Glassmorphism Cards** | Frosted glass effect with backdrop blur |
| **Animated Background** | Multi-color particle system on canvas |
| **Scroll Progress Bar** | Gradient indicator at the top of the page |
| **Card Hover Effects** | Scale + glow + accent color reveal |
| **Badge System** | `popular` · `new` · `beta` labels on cards |
| **Custom Scrollbar** | Pink scrollbar matching the theme |
| **Responsive Layout** | Works on desktop, tablet, and mobile |

### 💳 Payment Methods

<details>
<summary><strong>🇮🇳 India (3 methods)</strong></summary>

| Method | Type | Features |
|--------|------|----------|
| UPI QR Code | QR | Scan & pay, download QR |
| UPI ID | ID | Copy to clipboard |
| PhonePe | URL | Direct app link |

</details>

<details>
<summary><strong>🌍 International (3 methods)</strong></summary>

| Method | Type | Features |
|--------|------|----------|
| PayPal | URL | PayPal.Me link |
| Buy Me a Coffee | URL | Support link |
| Ko-fi | URL | Tip link |

</details>

<details>
<summary><strong>₿ Crypto (5 methods)</strong></summary>

| Method | Type | Features |
|--------|------|----------|
| Binance Pay | ID | Copy UID |
| Bybit Wallet | ID | Copy UID |
| Tonkeeper | Address | Copy TON address |
| Ethereum | Address | Copy ERC-20 address |
| Bitcoin | Address | Copy BTC address |

</details>

### ⚡ Interactions

- **Click-to-copy** — click any payment value to copy instantly
- **Toast notifications** — stacking toasts with icons
- **Category tabs** — filter by India / International / Crypto
- **Stats counters** — animated number counters
- **Keyboard shortcuts** — `Esc` reset filter, `Ctrl+K` navigate
- **QR download** — download QR codes as PNG
- **Back to top** — floating button on scroll

---

## 🔧 Customization

Everything is in **`assets/js/config.js`**. No HTML editing needed.

### Toggle a method on/off

```javascript
// Show it
{ name: "PayPal", ..., enabled: true }

// Hide it
{ name: "PayPal", ..., enabled: false }
```

### Add a new payment method

```javascript
// Add to any category's items[] array:
{
  name: "Stripe",              // Display name
  icon: "fab fa-stripe-s",     // Font Awesome 6 icon
  iconBg: "#635bff",           // Icon circle background
  type: "url",                 // "id" | "url" | "qr" | "address"
  value: "https://...",        // Payment ID / URL / address
  label: "Stripe Link",        // Small label above value
  description: "Pay via card", // One-line description
  color: "#635bff",            // Card accent color
  enabled: true,               // Show or hide
  copyable: true,              // Show copy button
  badge: "new"                 // "popular" | "new" | "beta" | null
}
```

### Add a new category

```javascript
// Add a new key to PAYMENT_METHODS:
wallets: {
  title: "Digital Wallets",
  subtitle: "Apple Pay, Google Pay & more",
  icon: "fas fa-wallet",
  items: [
    { name: "Apple Pay", ... },
    { name: "Google Pay", ... }
  ]
}
```

### Change site info

```javascript
// Edit SITE_CONFIG:
const SITE_CONFIG = {
  name: "Your Name",
  tagline: "Your tagline",
  footer: "Your footer text",
  year: 2025,
  author: { name: "You", url: "https://..." },
  socials: [
    { icon: "fab fa-github", url: "https://...", label: "GitHub" }
  ]
};
```

---

## 📁 Project Structure

```
AniPay/
├── index.html                 → Semantic HTML, zero inline code
├── assets/
│   ├── css/
│   │   └── styles.css         → All styles, light/dark themes, responsive
│   └── js/
│       ├── config.js          → ⚡ EDIT THIS — methods, site info, socials
│       └── app.js             → Rendering engine, particles, tabs, theme
├── Source/                    → Images and banners
├── CHANGELOG.md               → Version history
├── LICENSE                    → MIT License
└── README.md                  → You're reading it
```

---

## 🛠️ Technologies

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Anime.js](https://img.shields.io/badge/Anime.js-2C2D72?style=for-the-badge&logo=javascript&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white)

</div>

- **Fonts:** Inter (primary) · Josefin Sans (display) · JetBrains Mono (code)
- **Icons:** Font Awesome 6.5.1 (Free)
- **Animations:** Anime.js 3.2.2
- **QR API:** goqr.me API (auto-generated)
- **Hosting:** GitHub Pages

---

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

| Version | Date | Highlights |
|---------|------|------------|
| **v3.0.0** | 2026-05-06 | Complete rebuild, new design, all methods enabled, theme toggle |
| **v2.0.0** | 2026-05-06 | Modular architecture, data-driven config |
| **v1.0.0** | 2025-01-01 | Initial release |

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💖 Support

<div align="center">

If you find this useful, consider supporting:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shineii86)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/shineii86)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/shineii86)

</div>

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/awesome`)
3. Commit (`git commit -m "Add awesome feature"`)
4. Push (`git push origin feature/awesome`)
5. Open a Pull Request

---

## 📬 Contact

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shineii86)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/shineii86)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://telegram.me/shineii86)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/ikx7.a)
[![Pinterest](https://img.shields.io/badge/Pinterest-E60023?style=for-the-badge&logo=pinterest&logoColor=white)](https://pinterest.com/ikx7a)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ikx7a@hotmail.com)

<br>

**Made with ❤️ by [Shinei Nouzen](https://github.com/shineii86)**

</div>
