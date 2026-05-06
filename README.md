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

- **Zero Two Themed UI**
  - [x] Beautiful pink and teal color scheme inspired by Zero Two
  - [x] Particle animation background with anime.js
  - [x] Responsive design for all devices
  - [x] Glassmorphism cards with backdrop blur
  
- **Data-Driven Payment Methods** ⚡
  - [x] Toggle any payment method on/off with `enabled: true/false`
  - [x] Add new methods by appending a JSON object — no HTML editing needed
  - [x] Pre-configured: PayPal, Buy Me a Coffee, Ko-fi (disabled by default)
  - [x] Supports `id`, `url`, `qr`, and `address` payment types
  - **Indian Payments**
    - [x] QR Code payment with download option
    - [x] UPI payment with copy functionality
  - **International Payments**
    - [x] Binance ID
    - [x] Bybit ID
    - [x] Tonkeeper address
    - [ ] PayPal (toggle `enabled: true` in config to activate)
    - [ ] Buy Me a Coffee (toggle `enabled: true` in config to activate)
    - [ ] Ko-fi (toggle `enabled: true` in config to activate)

- **Advanced Animations**
  - [x] Smooth entrance animations with anime.js
  - [x] Scroll-reveal card animations via IntersectionObserver
  - [x] Interactive button hover effects with shine sweep
  - [x] Particle system background
  - [x] Toast notification system
  - [x] Animated gradient title

- **Modular Architecture** 🔧
  - [x] Separated HTML, CSS, and JavaScript files
  - [x] Config-driven rendering — edit `assets/js/config.js` to manage methods
  - [x] Built with pure HTML, CSS, and JavaScript
  - [x] Uses anime.js for advanced animations
  - [x] Josefin Sans + JetBrains Mono fonts

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

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Activity/Artist%20Palette.webp" alt="Artist Palette" width="25" height="25" /> Customization

### 1) Add / Toggle Payment Methods

All payment methods are managed in **`assets/js/config.js`**. No HTML editing needed!

**To enable a pre-configured method** (e.g. PayPal):
```javascript
{
  name: "PayPal",
  icon: "fab fa-paypal",        // Font Awesome icon
  iconColor: "#00457C",         // Icon color
  type: "id",                   // "id" | "url" | "qr" | "address"
  value: "your@email.com",     // Payment ID / URL / address
  description: "Send via PayPal",
  enabled: true,                // ← Change to true to show
  copyable: true                // ← Shows copy button
}
```

**To add a brand new method**, append to the appropriate array:
```javascript
// In PAYMENT_CONFIG → indian.methods[] or international.methods[]
{
  name: "Google Pay",
  icon: "fab fa-google",
  iconColor: "#4285F4",
  type: "id",
  value: "your-gpay@okaxis",
  description: "Pay via Google Pay UPI",
  enabled: true,
  copyable: true
}
```

**To disable a method**, set `enabled: false`:
```javascript
{ ..., enabled: false }  // This method will not render
```

### 2) Supported Payment Types

| Type | Renders | Buttons |
|------|---------|---------|
| `qr` | QR code image | Download QR |
| `id` | Monospace value display | Copy |
| `address` | Monospace value display | Copy |
| `url` | Monospace value display | Copy + Open |

### 3) Site Identity

Edit the `site` object in config to change name, tagline, footer text, and social links:
```javascript
site: {
  name: "AniPay",
  tagline: "Your custom tagline",
  footer: "Your footer text",
  year: 2025,
  socials: [
    { icon: "fab fa-twitter", url: "https://...", label: "Twitter" }
  ]
}
```
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner4.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Symbols/Heart%20On%20Fire.webp" alt="Heart On Fire" width="25" height="25" /> Project Structure

```
AniPay/
├── index.html              # Main page (clean HTML, no inline code)
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles (glassmorphism, animations, responsive)
│   └── js/
│       ├── config.js       # ⚡ Payment methods config (edit this to add/toggle methods)
│       └── app.js          # Rendering engine, particles, animations
├── Source/                 # Images and banners
├── CHANGELOG.md            # Version history
├── LICENSE
└── README.md
```

**To add a QR-type payment method:**
```javascript
{
  name: "My UPI QR",
  icon: "fas fa-qrcode",
  iconColor: "#5ffbf1",
  type: "qr",
  value: "upi://pay?pa=your@upi&pn=YourName",  // Any URL or UPI string
  description: "Scan to pay via UPI",
  enabled: true,
  downloadable: true  // Shows download button
}
```
The QR code is auto-generated from the `value` field using the qrserver.com API.

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
