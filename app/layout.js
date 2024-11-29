import "./globals.css";
import Link from "next/link";
export const metadata = {
  title: "GitHub",
  description: "GH en moins bien",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className="antialiased"
      >
      <div className={"text-center"}>
        <Link href={"/"} className={"font-bold"}>Accueil</Link>
      </div>
        {children}
      </body>
    </html>
  );
}
