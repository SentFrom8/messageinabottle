import type { Metadata } from 'next'
import  Layout  from './styles/Layout.module.css'
import './styles/global.css'
import { MessageContextProvider } from './context/messageContext'

export const metadata: Metadata = {
  title: 'Message in a Bottle!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={Layout.main}>
          <MessageContextProvider>{children}</MessageContextProvider>
        </div>
      </body>
    </html>
  )
}
