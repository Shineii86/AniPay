# Zero Two Payment Gateway 🌸

![Zero Two Payment Gateway Screenshot](https://via.placeholder.com/800x400/1a0a2e/ffffff?text=Zero+Two+Payment+Gateway+Screenshot)

A stunning anime-inspired payment gateway interface featuring Zero Two (Code:002) from Darling in the Franxx. This project combines beautiful UI design with functional payment methods for both Indian and international users.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-demo-link.com)
![License](https://img.shields.io/github/license/yourusername/zero-two-payment?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/zero-two-payment?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/yourusername/zero-two-payment?style=for-the-badge)

## ✨ Features

- **Zero Two Themed UI** 🌸
  - Beautiful pink and teal color scheme inspired by Zero Two
  - Particle animation background with anime.js
  - Responsive design for all devices
  
- **Payment Methods** 💳
  - **Indian Payments**
    - QR Code payment with download option
    - UPI payment with copy functionality
  - **International Payments**
    - Binance ID
    - Bybit ID
    - Tonkeeper address

- **Advanced Animations** ✨
  - Smooth entrance animations for all elements
  - Interactive button hover effects
  - Particle system background
  - Notification system

- **Modern Technologies** 🔧
  - Built with pure HTML, CSS, and JavaScript
  - Uses anime.js for advanced animations
  - Josefin Sans font for elegant typography

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zero-two-payment.git
   ```

2. **Open the project**
   ```bash
   cd zero-two-payment
   ```

3. **Open index.html in your browser**
   - Simply double-click the `index.html` file
   - Or run a local server:
     ```bash
     python -m http.server
     ```
     Then visit `http://localhost:8000`

## 🎨 Customization

### Change Payment Details
Edit the payment details in the HTML file:
```html
<!-- Indian Payments -->
<div class="id-display">
  zerotwo002@animebank  <!-- Change UPI ID here -->
</div>

<!-- International Payments -->
<div class="id-display">
  BNCID-ZEROTWO-00288475  <!-- Change Binance ID here -->
</div>
```

### Modify Colors
Edit the CSS variables in the style section:
```css
:root {
  --primary: #ff2a6d;      /* Pink color */
  --secondary: #5ffbf1;    /* Teal color */
  --dark-bg: #0c0c1d;      /* Dark background */
}
```

### Adjust Animations
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

## 🖥️ Technologies Used

- **Frontend**
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  
- **Libraries**
  ![Anime.js](https://img.shields.io/badge/Anime.js-2C2D72?style=for-the-badge&logo=javascript&logoColor=white)
  ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white)

- **Fonts**
  ![Josefin Sans](https://img.shields.io/badge/Josefin_Sans-000000?style=for-the-badge&logo=google-fonts&logoColor=white)

## 📸 Screenshots

| Indian Payment Methods | International Payment Methods |
|------------------------|-------------------------------|
| ![Indian Payments](https://via.placeholder.com/400x600/1a0a2e/ffffff?text=Indian+Payment+Methods) | ![International Payments](https://via.placeholder.com/400x600/1a0a2e/ffffff?text=International+Payment+Methods) |

| Mobile View | Animations |
|-------------|------------|
| ![Mobile View](https://via.placeholder.com/300x500/1a0a2e/ffffff?text=Mobile+View) | ![Animations](https://via.placeholder.com/400x300/1a0a2e/ffffff?text=Particle+Animations) |

## 🌟 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgements

- Zero Two (Code:002) from [Darling in the Franxx](https://darli-fra.jp/)
- [Anime.js](https://animejs.com/) for amazing animations
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans) font

---

**Made with ❤️ by [Your Name]**  
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourhandle)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
