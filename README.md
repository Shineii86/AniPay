<div align="center">
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/logo.png" alt="logo" height="200">
  </a>
  
# [AniPay](https://github.com/Shineii86/AniPay)

A stunning anime-inspired payment gateway interface featuring Zero Two (Code:002) from Darling in the Franxx. This project combines beautiful UI design with functional payment methods for both Indian and international users.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://shineii86.github.io/AniPay/)
![License](https://img.shields.io/github/license/Shineii86/AniPay?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/Shineii86/AniPay?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/Shineii86/AniPay?style=for-the-badge) [![GitHub Stars](https://img.shields.io/github/stars/Shineii86/AniPay?style=for-the-badge)](https://github.com/Shineii86/AniPay/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/Shineii86/AniPay?style=for-the-badge)](https://github.com/Shineii86/AniPay/fork)

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner1.png" alt="Banner">
  </a>

</div>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Activity/Sparkles.webp" alt="Sparkles" width="25" height="25" /> Features

- **All-New Modern Design**
  - [x] Dark glassmorphism UI with animated gradient title
  - [x] Particle background with multi-color particles
  - [x] Scroll progress bar & back-to-top button
  - [x] Card hover glow effects with unique accent colors
  - [x] Responsive across all devices

- **All Payment Methods Enabled** ⚡
  - [x] **India**: UPI QR, UPI ID, PhonePe
  - [x] **International**: PayPal, Buy Me a Coffee, Ko-fi
  - [x] **Crypto**: Binance, Bybit, Tonkeeper, Ethereum, Bitcoin
  - [x] Toggle any method with `enabled: true/false`
  - [x] Add new methods by appending a JSON object — no HTML needed

- **Category Filtering**
  - [x] Tab-based navigation: All / India / International / Crypto
  - [x] Animated section transitions
  - [x] Badge system: popular, new, beta labels on cards

- **Smart Interactions**
  - [x] Click-to-copy on all payment values with visual feedback
  - [x] QR code download for QR-type methods
  - [x] Stacking toast notifications
  - [x] Keyboard shortcuts (Esc to reset, Ctrl+K to navigate)
  - [x] Animated stats counters

- **Fork-Friendly** 🍴
  - [x] Single config file to manage everything
  - [x] Fully documented field reference in config.js
  - [x] Add new categories, methods, or social links easily
  - [x] Zero HTML editing required — just edit config.js

ㅤㅤ
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner2.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Objects/Mobile%20Phone%20With%20Arrow.webp" alt="Mobile Phone With Arrow" width="25" height="25" /> Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shimeii86/AniPay.git
   ```

2. **Open the project**
   ```bash
   cd AniPay
   ```

3. **Open index.html in your browser**
   - Simply double-click the `index.html` file
   - Or run a local server:
     ```bash
     python -m http.server
     ```
     Then visit `http://localhost:8000`

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner3.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Activity/Artist%20Palette.webp" alt="Artist Palette" width="25" height="25" /> Quick Start (Fork & Customize)

### 1. Fork this repo
Click the **Fork** button on GitHub → you get your own copy.

### 2. Edit `assets/js/config.js`
That's it. One file controls everything:

**Enable/disable methods:**
```javascript
{ name: "PayPal", ..., enabled: true }   // Shown
{ name: "PayPal", ..., enabled: false }  // Hidden
```

**Add a new method:**
```javascript
{
  name: "Stripe",
  icon: "fab fa-stripe-s",
  iconBg: "#635bff",
  type: "url",
  value: "https://stripe.com/pay/your-link",
  label: "Stripe Link",
  description: "Pay securely with card via Stripe",
  color: "#635bff",
  enabled: true,
  copyable: true,
  badge: "new"       // "popular" | "new" | "beta" | null
}
```

**Add a new category:**
```javascript
// In PAYMENT_METHODS object:
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

### 3. Deploy
Push to GitHub → enable GitHub Pages in Settings → Done.
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner4.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Symbols/Heart%20On%20Fire.webp" alt="Heart On Fire" width="25" height="25" /> Project Structure

```
AniPay/
├── index.html              → Clean semantic HTML
├── assets/
│   ├── css/
│   │   └── styles.css      → All styles (glassmorphism, responsive, animations)
│   └── js/
│       ├── config.js       → ⚡ EDIT THIS — payment methods, site info, socials
│       └── app.js          → Rendering engine, particles, tabs, interactions
├── Source/                 → Images and banners
├── CHANGELOG.md            → Version history
├── LICENSE
└── README.md
```

**To add a QR-type method:**
```javascript
{
  name: "My UPI QR",
  icon: "fas fa-qrcode",
  iconBg: "#1a1a2e",
  type: "qr",
  value: "upi://pay?pa=your@upi&pn=YourName",
  label: "Scan with any UPI app",
  description: "PhonePe, Google Pay, Paytm — scan and pay",
  color: "#5ffbf1",
  enabled: true,
  downloadable: true,
  badge: "popular"
}
```
QR codes are auto-generated from the `value` field via qrserver.com API.

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner5.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Objects/Test%20Tube.webp" alt="Test Tube" width="25" height="25" /> Technologies Used

- **Frontend**
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  
- **Libraries**
  ![Anime.js](https://img.shields.io/badge/Anime.js-2C2D72?style=for-the-badge&logo=javascript&logoColor=white)
  ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white)

- **Fonts**
  ![Josefin Sans](https://img.shields.io/badge/Josefin_Sans-000000?style=for-the-badge&logo=google-fonts&logoColor=white)

---

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner6.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/AniEmojis/main/Objects/Identification%20Card.webp" alt="Identification Card" width="25" height="25" /> License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Symbols/Two%20Hearts.webp" alt="Two Hearts" width="25" height="25" /> Loved My Work?

<img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Animals%20and%20Nature/Star.webp" alt="Star" width="20" height="20" />&nbsp;[Give a star to this project](https://github.com/Shineii86/AniPay/) <br/>
<img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Animals%20and%20Nature/Cherry%20Blossom.webp" alt="Cherry Blossom" width="20" height="20" />&nbsp;[Follow me on GitHub](https://github.com/Shineii86/Shineii86)<br/>

> <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Smileys/Thinking%20Face.webp" alt="Thinking Face" width="20" height="20" /> Wondering where to get these animated emojis?
> [Visit here!](https://github.com/Shineii86/AniEmojis) You also should look around my other github repos. Maybe you'll find some cool useful stuff there.

  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner7.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/AniEmojis/refs/heads/main/Objects/Telephone.webp" alt="Telephone" width="25" height="25" /> Contact

<div align="center">
  
  *For inquiries or collaborations:*
     
[![Telegram Badge](https://img.shields.io/badge/-Telegram-2CA5E0?style=flat&logo=Telegram&logoColor=white)](https://telegram.me/Shineii86 "Contact on Telegram")
[![Instagram Badge](https://img.shields.io/badge/-Instagram-C13584?style=flat&logo=Instagram&logoColor=white)](https://instagram.com/ikx7.a "Follow on Instagram")
[![Pinterest Badge](https://img.shields.io/badge/-Pinterest-E60023?style=flat&logo=Pinterest&logoColor=white)](https://pinterest.com/ikx7a "Follow on Pinterest")
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?style=flat&logo=Gmail&logoColor=white)](mailto:ikx7a@hotmail.com "Send an Email")

  <sup><b>Copyright © 2025 <a href="https://telegram.me/Shineii86">Shinei Nouzen</a> All Rights Reserved</b></sup>

</div>
