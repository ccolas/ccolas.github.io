export const site = {
  title: "Cédric Colas",
  description: "AI researcher exploring open-ended learning and computational creativity.",
  defaultFeaturedImage: "/images/og-banner.png",
  logoImage: "/images/logo.png",
  menuItems: [
    { title: "Hello!", url: "/" },
    { title: "Explorations", url: "/project/" },
    { title: "Research", url: "/publications/" },
    { title: "Photography", url: "/photographs/" },
    { title: "Contact", url: "/contact/" }
  ],
  socialItems: [
    { name: "Linkedin", icon: "linkedin", url: "https://www.linkedin.com/in/cedriccolas/" },
    { name: "Github", icon: "github", url: "https://github.com/ccolas" },
    { name: "X", icon: "x", url: "https://x.com/cedcolas" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/bkayf_" },
    { name: "Spotify", icon: "spotify", url: "https://open.spotify.com/user/bkayf" }
  ]
} as const;
