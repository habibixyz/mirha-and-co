import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'Mirha & Co.',
  description: 'Timeless objects for modern spaces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={playfair.className + " bg-[#F5F1EA] text-[#4A3F35]"}>

        {/* Navigation */}
        <nav className="flex justify-between items-center px-10 py-6">
          <div className="text-lg tracking-widest">
            MIRHA & CO.
          </div>

          <div className="space-x-8 text-sm tracking-wide">
            <a href="/shop" className="hover:opacity-70">Shop</a>
            <a href="/about" className="hover:opacity-70">About</a>
            <a href="/contact" className="hover:opacity-70">Contact</a>
          </div>
        </nav>

        {children}

      </body>
    </html>
  )
}
