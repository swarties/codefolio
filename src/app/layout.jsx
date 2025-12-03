import "./globals.css";

export const metadata = {
  title: "Codefolio",
  description: "Codefolio - Show off your GitHub repos",
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
