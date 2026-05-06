/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay - Payment Methods Configuration
 * ═══════════════════════════════════════════════════════════
 *
 *  HOW TO ADD A NEW PAYMENT METHOD:
 *  ─────────────────────────────────
 *  Simply add a new object to the appropriate category array.
 *
 *  Fields:
 *    name        → Display name (e.g. "PayPal")
 *    icon        → Font Awesome icon class (e.g. "fab fa-paypal")
 *    iconColor   → CSS color for the icon (e.g. "#00457C")
 *    type        → "id" | "url" | "qr" | "address"
 *    value       → The payment ID / URL / address / QR data
 *    description → Short description shown on the card
 *    enabled     → true = shown | false = hidden
 *    copyable    → true = shows copy button
 *    downloadable→ true = shows download button (for QR type)
 *
 *  EXAMPLE - Adding PayPal:
 *  {
 *    name: "PayPal",
 *    icon: "fab fa-paypal",
 *    iconColor: "#00457C",
 *    type: "id",
 *    value: "your-paypal@email.com",
 *    description: "Send payment via PayPal to this email",
 *    enabled: true,
 *    copyable: true
 *  }
 *
 * ═══════════════════════════════════════════════════════════
 */

const PAYMENT_CONFIG = {

  // ── Site Identity ────────────────────────────────────────
  site: {
    name: "AniPay",
    tagline: "Darling in the Franxx Inspired Payment Gateway",
    footer: "Inspired by Code:002 from Darling in the Franxx",
    year: 2025,
    socials: [
      { icon: "fab fa-twitter", url: "https://x.com/shineii86", label: "Twitter" },
      { icon: "fab fa-github",  url: "https://github.com/shineii86", label: "GitHub" },
      { icon: "fab fa-telegram", url: "https://telegram.me/shineii86", label: "Telegram" }
    ]
  },

  // ── Indian Payment Methods ───────────────────────────────
  indian: {
    title: "For Nation (Indian)",
    subtitle: "Secure payment methods for Indian users",
    methods: [
      {
        name: "QR Payment",
        icon: "fas fa-qrcode",
        iconColor: "#5ffbf1",
        type: "qr",
        value: "https://telegram.me/shineii86",
        description: "Scan this QR code with any UPI app to complete your payment",
        enabled: true,
        downloadable: true
      },
      {
        name: "UPI Payment",
        icon: "fas fa-mobile-alt",
        iconColor: "#ff2a6d",
        type: "id",
        value: "shinei@anipay",
        description: "Copy our UPI ID and paste it in your payment app",
        enabled: true,
        copyable: true
      }
    ]
  },

  // ── International Payment Methods ────────────────────────
  international: {
    title: "International Payments",
    subtitle: "Global payment methods for worldwide users",
    methods: [
      {
        name: "PayPal",
        icon: "fab fa-paypal",
        iconColor: "#00457C",
        type: "id",
        value: "your-paypal@email.com",
        description: "Send payment securely via PayPal",
        enabled: false,
        copyable: true
      },
      {
        name: "Buy Me a Coffee",
        icon: "fas fa-mug-hot",
        iconColor: "#FFDD00",
        type: "url",
        value: "https://buymeacoffee.com/shineii86",
        description: "Support us with a coffee! Every bit helps",
        enabled: false,
        copyable: true
      },
      {
        name: "Binance Pay",
        icon: "fab fa-bitcoin",
        iconColor: "#F0B90B",
        type: "id",
        value: "853904044",
        description: "Send payment via Binance using our ID",
        enabled: true,
        copyable: true
      },
      {
        name: "Bybit Wallet",
        icon: "fas fa-wallet",
        iconColor: "#F7A600",
        type: "id",
        value: "199911528",
        description: "Send payment via Bybit using our ID",
        enabled: true,
        copyable: true
      },
      {
        name: "Tonkeeper",
        icon: "fas fa-coins",
        iconColor: "#0098EA",
        type: "address",
        value: "UQBmK_-2A-gHnhx0hmWdFeQc8X7iZ0O_UkxQbQGU2uA6OwmX",
        description: "Send TON payment via Tonkeeper wallet",
        enabled: true,
        copyable: true
      },
      {
        name: "Ko-fi",
        icon: "fas fa-heart",
        iconColor: "#FF5E5B",
        type: "url",
        value: "https://ko-fi.com/shineii86",
        description: "Support us on Ko-fi",
        enabled: false,
        copyable: true
      }
    ]
  }
};
