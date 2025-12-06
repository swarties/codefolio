import "./globals.css";

/* export const metadata = {
  title: "Codefolio — GitHub Portfolio",
  description:
    "A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world.",
  openGraph: {
    title: "Codefolio — GitHub Portfolio",
    description:
      "A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world.",
    url: "https://codefolio.app",
    siteName: "Codefolio",
    images: [
      {
        url: "./opengraph-image.png", // Must be an absolute URL
        width: 720,
        height: 378,
        alt: "Homepage Render",
      },
    ],
    type: "website",
  },
}; */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Codefolio — GitHub Portfolio</title>
        <meta
          name="description"
          content="A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world."
        />

        <link rel="canonical" href="https://codefolio.app" />

        <meta property="og:title" content="Codefolio — GitHub Portfolio" />
        <meta
          property="og:description"
          content="A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world."
        />
        <meta property="og:url" content="https://codefolio.app" />
        <meta property="og:site_name" content="Codefolio" />
        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://codefolio.app/opengraph-image.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://codefolio.app/opengraph-image.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="378" />
        <meta property="og:image:alt" content="Homepage Render" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Codefolio — GitHub Portfolio" />
        <meta
          name="twitter:description"
          content="A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world."
        />
        <meta
          name="twitter:image"
          content="https://codefolio.app/opengraph-image.png"
        />
        <meta name="twitter:image:alt" content="Homepage Render" />
      </head>
      <body>{children}</body>
    </html>
  );
}
