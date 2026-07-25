import './globals.css';

export const metadata = {
  title: 'ClipStream AI - Generador de Videos con IA',
  description: 'Transforma tus ideas en clips virales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
