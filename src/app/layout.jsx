import "./globals.css";

export const metadata = {
  title: 'Codefolio — GitHub Portfolio',
  description: 'A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world.',
  openGraph: {
    title: 'Codefolio — GitHub Portfolio',
    description: 'A clean and minimalistic platform where developers can showcase their work. Link your GitHub account, generate a profile page, and share your code with the world.',
    url: 'https://codefolio.app',
    siteName: 'Codefolio',
    images: [
      {
        url: './opengraph-image.png', // Must be an absolute URL
        width: 720,
        height: 378,
        alt: 'Homepage Render',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
