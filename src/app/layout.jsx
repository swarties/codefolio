import "./globals.css";

export const metadata = {
  title: "Codefolio",
  description: "Codefolio - Show off your GitHub repos",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
