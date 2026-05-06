/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AniPay v4.0 — Complete Configuration                       ║
 * ║  Single source of truth for ALL site content                ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  HOW TO CUSTOMIZE                                           │
 *  │  ─────────────────                                          │
 *  │                                                             │
 *  │  1. ENABLE/DISABLE entire sections:                         │
 *  │     Toggle `features.profile`, `features.socials`, etc.     │
 *  │                                                             │
 *  │  2. EDIT profile info:                                      │
 *  │     Change `profile.displayName`, `profile.bio`, etc.       │
 *  │                                                             │
 *  │  3. ADD/REMOVE social links:                                │
 *  │     Edit `socials` array — set `enabled: true/false`        │
 *  │                                                             │
 *  │  4. ADD/REMOVE posts:                                       │
 *  │     Edit `posts.items` array                                │
 *  │                                                             │
 *  │  5. ADD payment methods:                                    │
 *  │     Copy any object in `payments`, change values, done.     │
 *  │                                                             │
 *  │  6. All sections, fields, and features support enable/disable│
 *  └─────────────────────────────────────────────────────────────┘
 *
 *  SOCIAL PLATFORM REFERENCE:
 *  ──────────────────────────
 *  github, twitter, telegram, instagram, youtube, discord,
 *  tiktok, linkedin, pinterest, snapchat, reddit, twitch,
 *  facebook, whatsapp, signal, mastodon, bluesky, threads,
 *  email, spotify, steam, dribbble, behance, medium, devto,
 *  hashnode, figma, codepen, stackoverflow, buymeacoffee,
 *  kofi, patreon, paypal, custom
 *
 *  PAYMENT FIELD REFERENCE:
 *  ────────────────────────
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

  // ── Site Identity ────────────────────────────────────────
  name: "AniPay",
  version: "5.0",
  tagline: "Darling in the Franxx Inspired Payment Gateway",
  description: "A beautiful, anime-themed multi-method payment page with social links and posts. Fork it, customize it, make it yours.",
  footer: "Inspired by Code:002 from Darling in the Franxx",
  year: 2025,
  author: {
    name: "Shinei Nouzen",
    url: "https://github.com/shineii86"
  },

  // ── SEO & Open Graph ────────────────────────────────────
  // Controls meta tags for social sharing (Twitter, Discord, Telegram, etc.)
  // and PWA manifest metadata.
  seo: {
    enabled: true,                // Set false to skip injecting OG/Twitter meta tags
    title: "AniPay | Darling in the Franxx Payment Gateway",
    description: "A beautiful, anime-themed profile page with social links, posts, and payments.",
    image: "./Source/Banner1.png",   // OG image — recommended 1200x630
    url: "https://shineii86.github.io/AniPay/",  // Canonical URL
    twitterCard: "summary_large_image",            // "summary" | "summary_large_image"
    type: "website",                              // OG type
  },

  // ── Fonts ───────────────────────────────────────────────
  // Pick fonts from config — no CSS editing required.
  // Use any Google Fonts name. Fallbacks are automatic.
  fonts: {
    main: {
      family: "Inter",                    // Primary font for body text
      weights: "300;400;500;600;700;800", // Google Fonts weights string
    },
    heading: {
      family: "Josefin Sans",             // Font for headings & display text
      weights: "300;400;600;700",
    },
    mono: {
      family: "JetBrains Mono",           // Monospace for code-style values
      weights: "400;500",
    },
  },

  // ── Share Button ────────────────────────────────────────
  // One-click share to Twitter, WhatsApp, or copy link.
  share: {
    enabled: true,             // Set false to hide share button
    platforms: ["twitter", "whatsapp", "copy"],  // Which platforms to show
  },

  // ── Loading Animation ──────────────────────────────────
  // Splash screen with logo while page content loads.
  loading: {
    enabled: true,             // Set false to skip loading screen
    duration: 1500,            // Minimum display time in ms (before fade-out)
    logo: "./Source/logo.png", // Logo shown during loading
    text: "AniPay",            // Text below logo
  },

  // ── Admin Panel ───────────────────────────────────────
  // Access at ?admin — visual config editor with password protection.
  admin: {
    password: "anipay",           // Admin password (change this!)
  },

  // ── Accent Theme ────────────────────────────────────────
  // Multiple accent color options with a floating picker UI.
  // Stored in localStorage so the user's choice persists.
  theme: {
    accentPicker: true,           // Show the floating accent color picker
    accent: "pink",               // Default accent: "pink" | "teal" | "purple" | "gold" | "custom"
    customColor: "#ff2a6d",       // Only used when accent is "custom" — any valid CSS color
    accents: {
      pink:   { color: "#ff2a6d", label: "Pink" },
      teal:   { color: "#5ffbf1", label: "Teal" },
      purple: { color: "#a855f7", label: "Purple" },
      gold:   { color: "#fbbf24", label: "Gold" },
    },
  },

  // ── Feature Toggles ──────────────────────────────────────
  // Set any to false to hide that entire section
  features: {
    profile: true,          // Twitter/X-style profile section at top
    socials: true,          // Social media icons grid
    posts: true,            // Instagram-style posts grid
    payments: true,         // Payment methods section
    themeToggle: true,      // Light/dark theme toggle button
    particles: true,        // Animated particle background
    scrollProgress: true,   // Top scroll progress bar
    backToTop: true,        // Back to top floating button
    stats: true,            // Stats counter bar (methods, categories, etc.)
  },

  // ── Twitter/X-Style Profile ──────────────────────────────
  // Banner, avatar, verified badge, bio, stats, etc.
  profile: {
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=400&fit=crop",  // Banner image URL
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AniPay&backgroundColor=ff2a6d",      // Profile picture URL
    displayName: "Shinei Nouzen",       // Display name
    username: "@shineii86",             // Username/handle
    bio: "Building anime-themed open source tools ✨ Darling in the Franxx enthusiast 💕 Open source contributor & developer",  // Bio text
    bioLink: {                          // Clickable link in bio (set enabled: false to hide)
      url: "https://github.com/shineii86",
      label: "github.com/shineii86",
      enabled: true,
    },
    location: "Tokyo, Japan",          // Location text (set to "" to hide)
    joinDate: "January 2024",          // Join date text (set to "" to hide)
    verified: true,                     // Show verified badge (blue checkmark)
    bioTyping: true,                    // Typing animation on bio text (character-by-character reveal)
    qrCode: {                           // QR code popover — generates QR linking to current page
      enabled: true,                    // Set false to hide QR button
    },

    // Profile stats — each can be enabled/disabled
    stats: {
      posts: {
        count: 420,
        label: "Posts",
        enabled: true,
      },
      followers: {
        count: 12500,
        label: "Followers",
        enabled: true,
      },
      following: {
        count: 380,
        label: "Following",
        enabled: true,
      },
    },
  },

  // ── Social Media Links ───────────────────────────────────
  // Array of social platforms. Each: { platform, url, enabled }
  // Platform names map to Font Awesome icons automatically.
  // Set enabled: false to hide any platform.
  // Set url: "" to disable (hides even if enabled: true).
  socials: [
    // ── Developer & Code ──
    { platform: "github",         url: "https://github.com/shineii86",              enabled: true  },
    { platform: "codepen",        url: "https://codepen.io/shineii86",              enabled: false },
    { platform: "devto",          url: "https://dev.to/shineii86",                  enabled: false },
    { platform: "hashnode",       url: "https://shineii86.hashnode.dev",            enabled: false },
    { platform: "stackoverflow",  url: "https://stackoverflow.com/users/0000000",   enabled: false },
    { platform: "figma",          url: "https://figma.com/@shineii86",              enabled: false },

    // ── Social Networks ──
    { platform: "twitter",        url: "https://x.com/shineii86",                   enabled: true  },
    { platform: "instagram",      url: "https://instagram.com/ikx7.a",              enabled: true  },
    { platform: "threads",        url: "https://threads.net/@shineii86",            enabled: false },
    { platform: "bluesky",        url: "https://bsky.app/profile/shineii86",        enabled: false },
    { platform: "mastodon",       url: "https://mastodon.social/@shineii86",        enabled: false },
    { platform: "facebook",       url: "https://facebook.com/shineii86",            enabled: false },
    { platform: "linkedin",       url: "https://linkedin.com/in/shineii86",         enabled: false },
    { platform: "pinterest",      url: "https://pinterest.com/ikx7a",               enabled: true  },
    { platform: "snapchat",       url: "https://snapchat.com/add/shineii86",        enabled: false },
    { platform: "reddit",         url: "https://reddit.com/user/shineii86",         enabled: false },

    // ── Messaging ──
    { platform: "telegram",       url: "https://telegram.me/shineii86",             enabled: true  },
    { platform: "discord",        url: "https://discord.gg/example",                enabled: false },
    { platform: "whatsapp",       url: "https://wa.me/1234567890",                  enabled: false },
    { platform: "signal",         url: "https://signal.me/#p/+1234567890",          enabled: false },

    // ── Streaming & Content ──
    { platform: "youtube",        url: "https://youtube.com/@shineii86",            enabled: false },
    { platform: "tiktok",         url: "https://tiktok.com/@shineii86",             enabled: false },
    { platform: "twitch",         url: "https://twitch.tv/shineii86",               enabled: false },
    { platform: "spotify",        url: "https://open.spotify.com/user/shineii86",   enabled: false },

    // ── Gaming ──
    { platform: "steam",          url: "https://steamcommunity.com/id/shineii86",   enabled: false },

    // ── Design & Creative ──
    { platform: "dribbble",       url: "https://dribbble.com/shineii86",            enabled: false },
    { platform: "behance",        url: "https://behance.net/shineii86",             enabled: false },

    // ── Blogging ──
    { platform: "medium",         url: "https://medium.com/@shineii86",             enabled: false },

    // ── Support & Donations ──
    { platform: "buymeacoffee",   url: "https://buymeacoffee.com/shineii86",        enabled: false },
    { platform: "kofi",           url: "https://ko-fi.com/shineii86",               enabled: false },
    { platform: "patreon",        url: "https://patreon.com/shineii86",             enabled: false },
    { platform: "paypal",         url: "https://paypal.me/shineii86",               enabled: false },

    // ── Email ──
    { platform: "email",          url: "mailto:hello@example.com",                  enabled: false },
  ],

  // ── Social Icons Section Settings ────────────────────────
  socialsSection: {
    title: "Connect",
    subtitle: "Find me across the web",
    enabled: true,          // Set false to hide section header (icons still show if features.socials is true)
  },

  // ── Instagram-Style Posts ────────────────────────────────
  posts: {
    title: "Latest Posts",
    subtitle: "Snapshots from my world",
    columns: 3,             // Number of columns: 2, 3, or 4
    items: [
      {
        images: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=600&fit=crop",
        ],
        caption: "Darling in the Franxx vibes ✨ Zero Two forever 💕",
        likes: 245,
        enabled: true,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1541562232579-512a21360020?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&h=600&fit=crop",
        ],
        caption: "Anime convention highlights! So many amazing cosplays 🎭",
        likes: 512,
        enabled: true,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
        ],
        caption: "Late night coding session with lofi beats 🎧💻",
        likes: 128,
        enabled: true,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=600&fit=crop",
        ],
        caption: "New manga haul! Can't wait to read these 📚",
        likes: 367,
        enabled: true,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1515879218367-8466d910auj5?w=600&h=600&fit=crop",
        ],
        caption: "Cherry blossom season in Tokyo 🌸",
        likes: 891,
        enabled: true,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1613771404784-3c5f5f8e2874?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&h=600&fit=crop",
        ],
        caption: "Studio setup tour — where the magic happens ✨🖥️",
        likes: 743,
        enabled: true,
      },
    ],
  },

  // ── Payment Methods ──────────────────────────────────────
  // Organized by category. Each category has: title, subtitle, icon, items[]
  // Each item has: name, icon, iconBg, type, value, label, description, color, enabled, etc.
  payments: {
    // ─── INDIA ──────────────────────────────────────────────
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

    // ─── INTERNATIONAL ──────────────────────────────────────
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

    // ─── CRYPTO ─────────────────────────────────────────────
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
  }
};

/**
 * ═══════════════════════════════════════════════════════════
 *  Social Platform Icon Map
 *  Maps platform names to Font Awesome classes and brand colors
 * ═══════════════════════════════════════════════════════════
 */
const SOCIAL_ICONS = {
  github:         { icon: "fab fa-github",          color: "#ffffff",   label: "GitHub" },
  twitter:        { icon: "fab fa-x-twitter",       color: "#ffffff",   label: "X / Twitter" },
  telegram:       { icon: "fab fa-telegram",        color: "#26A5E4",   label: "Telegram" },
  instagram:      { icon: "fab fa-instagram",       color: "#E4405F",   label: "Instagram" },
  youtube:        { icon: "fab fa-youtube",          color: "#FF0000",   label: "YouTube" },
  discord:        { icon: "fab fa-discord",          color: "#5865F2",   label: "Discord" },
  tiktok:         { icon: "fab fa-tiktok",           color: "#00f2ea",   label: "TikTok" },
  linkedin:       { icon: "fab fa-linkedin",         color: "#0A66C2",   label: "LinkedIn" },
  pinterest:      { icon: "fab fa-pinterest",        color: "#BD081C",   label: "Pinterest" },
  snapchat:       { icon: "fab fa-snapchat",         color: "#FFFC00",   label: "Snapchat" },
  reddit:         { icon: "fab fa-reddit-alien",     color: "#FF5700",   label: "Reddit" },
  twitch:         { icon: "fab fa-twitch",           color: "#9146FF",   label: "Twitch" },
  facebook:       { icon: "fab fa-facebook",         color: "#1877F2",   label: "Facebook" },
  whatsapp:       { icon: "fab fa-whatsapp",         color: "#25D366",   label: "WhatsApp" },
  signal:         { icon: "fas fa-shield-halved",    color: "#3A76F0",   label: "Signal" },
  mastodon:       { icon: "fab fa-mastodon",         color: "#6364FF",   label: "Mastodon" },
  bluesky:        { icon: "fas fa-cloud",            color: "#0085FF",   label: "Bluesky" },
  threads:        { icon: "fab fa-threads",          color: "#ffffff",   label: "Threads" },
  email:          { icon: "fas fa-envelope",          color: "#EA4335",   label: "Email" },
  spotify:        { icon: "fab fa-spotify",          color: "#1DB954",   label: "Spotify" },
  steam:          { icon: "fab fa-steam",            color: "#171a21",   label: "Steam" },
  dribbble:       { icon: "fab fa-dribbble",         color: "#EA4C89",   label: "Dribbble" },
  behance:        { icon: "fab fa-behance",          color: "#1769FF",   label: "Behance" },
  medium:         { icon: "fab fa-medium",           color: "#ffffff",   label: "Medium" },
  devto:          { icon: "fab fa-dev",              color: "#ffffff",   label: "Dev.to" },
  hashnode:       { icon: "fas fa-hashtag",          color: "#2962FF",   label: "Hashnode" },
  figma:          { icon: "fab fa-figma",            color: "#F24E1E",   label: "Figma" },
  codepen:        { icon: "fab fa-codepen",          color: "#ffffff",   label: "CodePen" },
  stackoverflow:  { icon: "fab fa-stack-overflow",   color: "#F58025",   label: "Stack Overflow" },
  buymeacoffee:   { icon: "fas fa-mug-hot",          color: "#FFDD00",   label: "Buy Me a Coffee" },
  kofi:           { icon: "fas fa-heart",             color: "#FF5E5B",   label: "Ko-fi" },
  patreon:        { icon: "fab fa-patreon",          color: "#FF424D",   label: "Patreon" },
  paypal:         { icon: "fab fa-paypal",           color: "#00457C",   label: "PayPal" },
  custom:         { icon: "fas fa-link",              color: "#ffffff",   label: "Custom" },
};

/**
 * ═══════════════════════════════════════════════════════════
 *  PAYMENT_METHODS — derived from SITE_CONFIG.payments
 *  Kept as a reference for the rendering engine
 * ═══════════════════════════════════════════════════════════
 */
const PAYMENT_METHODS = SITE_CONFIG.payments;
