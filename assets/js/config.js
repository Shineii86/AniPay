/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AniPay v2.0 — Payment Methods Configuration                ║
 * ║  Edit this file to add, remove, or toggle payment methods   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  HOW TO CUSTOMIZE                                           │
 *  │  ─────────────────                                          │
 *  │                                                             │
 *  │  1. ENABLE/DISABLE a method:                                │
 *  │     Set  enabled: true   → shows on page                    │
 *  │     Set  enabled: false  → hides from page                  │
 *  │                                                             │
 *  │  2. ADD a new method:                                       │
 *  │     Copy any object below, change the values, done.         │
 *  │                                                             │
 *  │  3. REMOVE a method:                                        │
 *  │     Delete the entire object block from the array.          │
 *  │                                                             │
 *  │  4. REORDER methods:                                        │
 *  │     Move objects up/down in the array.                      │
 *  │                                                             │
 *  │  5. ADD a new category:                                     │
 *  │     Add a new key to PAYMENT_METHODS like:                  │
 *  │     crypto: { title: "...", icon: "...", items: [...] }     │
 *  └─────────────────────────────────────────────────────────────┘
 *
 *  FIELD REFERENCE:
 *  ────────────────
 *  name         → Display name (required)
 *  icon         → Font Awesome 6 class (required)
 *  iconBg       → Background color for icon circle
 *  type         → "id" | "url" | "qr" | "address" | "wallet"
 *  value        → Payment ID / URL / address / QR data (required)
 *  label        → Small label above value (e.g. "UPI ID", "Wallet Address")
 *  description  → One-line description
 *  color        → Accent color for the card border/glow
 *  enabled      → true = shown | false = hidden
 *  copyable     → true = shows copy button
 *  downloadable → true = shows download button (qr type only)
 *  badge        → "new" | "popular" | "beta" | null
 */

const SITE_CONFIG = {
  name: "AniPay",
  version: "2.0",
  tagline: "Darling in the Franxx Inspired Payment Gateway",
  description: "A beautiful, anime-themed multi-method payment page. Fork it, customize it, make it yours.",
  footer: "Inspired by Code:002 from Darling in the Franxx",
  year: 2025,
  author: {
    name: "Shinei Nouzen",
    url: "https://github.com/shineii86"
  },
  socials: [
    { icon: "fab fa-github",   url: "https://github.com/shineii86",         label: "GitHub" },
    { icon: "fab fa-twitter",  url: "https://x.com/shineii86",              label: "Twitter" },
    { icon: "fab fa-telegram", url: "https://telegram.me/shineii86",        label: "Telegram" },
    { icon: "fab fa-instagram",url: "https://instagram.com/ikx7.a",         label: "Instagram" },
    { icon: "fab fa-pinterest",url: "https://pinterest.com/ikx7a",          label: "Pinterest" }
  ]
};

const PAYMENT_METHODS = {

  // ─── INDIA ────────────────────────────────────────────────
  india: {
    title: "India",
    subtitle: "UPI, QR & local payment methods",
    icon: "fas fa-flag",
    items: [
      {
        name: "UPI QR Code",
        icon: "fas fa-qrcode",
        iconBg: "#1a1a2e",
        type: "qr",
        value: "upi://pay?pa=shinei@anipay&pn=AniPay&cu=INR",
        label: "Scan with any UPI app",
        description: "PhonePe, Google Pay, Paytm — scan and pay instantly",
        color: "#5ffbf1",
        enabled: true,
        downloadable: true,
        badge: "popular"
      },
      {
        name: "UPI ID",
        icon: "fas fa-at",
        iconBg: "#1a1a2e",
        type: "id",
        value: "shinei@anipay",
        label: "UPI ID",
        description: "Copy and paste in any UPI payment app",
        color: "#ff2a6d",
        enabled: true,
        copyable: true,
        badge: null
      },
      {
        name: "PhonePe",
        icon: "fas fa-mobile-screen",
        iconBg: "#5f259f",
        type: "url",
        value: "https://phoneme://pay?pa=shinei@anipay",
        label: "PhonePe Link",
        description: "Open directly in PhonePe app",
        color: "#5f259f",
        enabled: true,
        copyable: true,
        badge: null
      }
    ]
  },

  // ─── INTERNATIONAL ────────────────────────────────────────
  international: {
    title: "International",
    subtitle: "Global payment platforms",
    icon: "fas fa-globe",
    items: [
      {
        name: "PayPal",
        icon: "fab fa-paypal",
        iconBg: "#003087",
        type: "url",
        value: "https://paypal.me/shineii86",
        label: "PayPal.Me",
        description: "Send payment securely via PayPal — worldwide",
        color: "#0070ba",
        enabled: true,
        copyable: true,
        badge: "popular"
      },
      {
        name: "Buy Me a Coffee",
        icon: "fas fa-mug-hot",
        iconBg: "#ffdd00",
        type: "url",
        value: "https://buymeacoffee.com/shineii86",
        label: "BMC Link",
        description: "Support with a coffee — quick & easy",
        color: "#ffdd00",
        enabled: true,
        copyable: true,
        badge: "popular"
      },
      {
        name: "Ko-fi",
        icon: "fas fa-heart",
        iconBg: "#ff5e5b",
        type: "url",
        value: "https://ko-fi.com/shineii86",
        label: "Ko-fi Link",
        description: "Tip on Ko-fi — no fees, instant support",
        color: "#ff5e5b",
        enabled: true,
        copyable: true,
        badge: "new"
      }
    ]
  },

  // ─── CRYPTO ───────────────────────────────────────────────
  crypto: {
    title: "Crypto",
    subtitle: "Decentralized & blockchain payments",
    icon: "fab fa-bitcoin",
    items: [
      {
        name: "Binance Pay",
        icon: "fab fa-bitcoin",
        iconBg: "#1e2026",
        type: "id",
        value: "853904044",
        label: "Binance ID",
        description: "Send via Binance Pay — zero fees between users",
        color: "#f0b90b",
        enabled: true,
        copyable: true,
        badge: "popular"
      },
      {
        name: "Bybit Wallet",
        icon: "fas fa-wallet",
        iconBg: "#1a1a2e",
        type: "id",
        value: "199911528",
        label: "Bybit UID",
        description: "Transfer via Bybit — fast & low fees",
        color: "#f7a600",
        enabled: true,
        copyable: true,
        badge: null
      },
      {
        name: "Tonkeeper",
        icon: "fas fa-coins",
        iconBg: "#001f3f",
        type: "address",
        value: "UQBmK_-2A-gHnhx0hmWdFeQc8X7iZ0O_UkxQbQGU2uA6OwmX",
        label: "TON Address",
        description: "Send TON coins via Tonkeeper wallet",
        color: "#0098ea",
        enabled: true,
        copyable: true,
        badge: null
      },
      {
        name: "Ethereum",
        icon: "fab fa-ethereum",
        iconBg: "#1a1a2e",
        type: "address",
        value: "0x0000000000000000000000000000000000000000",
        label: "ERC-20 Address",
        description: "Send ETH or any ERC-20 token",
        color: "#627eea",
        enabled: true,
        copyable: true,
        badge: "new"
      },
      {
        name: "Bitcoin",
        icon: "fab fa-btc",
        iconBg: "#1a1a2e",
        type: "address",
        value: "bc1q000000000000000000000000000000000000",
        label: "BTC Address",
        description: "Send Bitcoin to this address",
        color: "#f7931a",
        enabled: true,
        copyable: true,
        badge: "new"
      }
    ]
  }
};
