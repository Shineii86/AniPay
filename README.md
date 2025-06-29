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
  
- **Payment Methods**
  - **Indian Payments**
    - [x] QR Code payment with download option
    - [x] UPI payment with copy functionality
  - **International Payments**
    - [x] Binance ID
    - [x] Bybit ID
    - [x] Tonkeeper address

- **Advanced Animations**
  - [x] Smooth entrance animations for all elements
  - [x] Interactive button hover effects
  - [x] Particle system background
  - [x] Notification system

- **Modern Technologies** 🔧
  - [x] Built with pure HTML, CSS, and JavaScript
  - [x] Uses anime.js for advanced animations
  - [x] Josefin Sans font for elegant typography

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

1) Change Payment Details
Edit the payment details in the HTML file:
```html
<!-- Indian UPI ID -->
<div class="id-display">
  shinei@anipay
</div>

<!-- Binance ID -->
<div class="id-display">
  853904044
</div>

<!-- Bybit ID -->
<div class="id-display">
  199911528
</div>

<!-- Tonkeeper Address -->
<div class="id-display">
  UQBmK_-2A-gHnhx0hmWdFeQc8X7iZ0O_UkxQbQGU2uA6OwmX
</div>
```

2) Modify Colors
Edit the CSS variables in the style section:
```css
:root {
  --primary: #ff2a6d;      /* Pink color */
  --secondary: #5ffbf1;    /* Teal color */
  --dark-bg: #0c0c1d;      /* Dark background */
}
```

3) Adjust Animations
Modify the anime.js parameters in the script section:
```javascript
// Particle count
const particleCount = 150;  /* Increase for more particles */

// Title animation
anime({
  targets: '.title',
  opacity: [0, 1],
  translateY: [-30, 0],
  duration: 1500,          /* Animation duration */
  easing: 'easeOutExpo'
});
```
  <a href="https://github.com/Shineii86/AniPay">
    <img src="./Source/Banner4.png" alt="Banner">
  </a>

## <img src="https://raw.githubusercontent.com/Shineii86/Emojis/main/Symbols/Heart%20On%20Fire.webp" alt="Heart On Fire" width="25" height="25" /> How to Add QR Code by URL
I've implemented QR code integration using an external URL. Here's how it works:

1) QR Code Generation:

```html
<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=zerotwo002@animebank&pn=Zero%20Two%20Pay&mc=0000&mode=02&purpose=00" 
     alt="UPI QR Code" 
     class="qr-image"
     id="qr-image">
```

2) URL Parameters Explained:
- [x] `size=150x150`: Sets the dimensions of the QR code
- [x] `data=upi://pay?pa`=...: Contains the UPI payment details
- [x] `pn=Zero%20Two%20Pay`: Sets the payee name
- [x] `mc=0000`: Merchant code
- [x] `mode=02`: Transaction mode

4) Download Functionality:
```javascript
document.getElementById('download-qr').addEventListener('click', function() {
    const qrImage = document.getElementById('qr-image');
    const imageUrl = qrImage.src;
    
    // Create a temporary link
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'anipay-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('QR Code downloaded!');
});
```

4) Copy to Clipboard:
```javascript
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const textElement = document.getElementById(targetId);
        const text = textElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        });
    });
});
```

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
