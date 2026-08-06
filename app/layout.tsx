import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AndresSoft Lab — Tecnología para tu negocio",
  description: "Datos, inteligencia artificial, automatización y software para impulsar negocios.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
