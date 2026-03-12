import "./globals.css"
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"]
})

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Panel Management System"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${poppins.className} bg-gray-50 text-gray-800`}
      >

        {/* Main Content */}
        {children}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style:{
              background:"#333",
              color:"#fff"
            }
          }}
        />

      </body>

    </html>
  )
}