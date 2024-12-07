import type { Metadata, Viewport } from "next";
import "./styles/global.css";
import { ReactNode } from "react";
import { Island_Moments, Kranky, Merriweather } from "next/font/google";
import Vengeance from "next/font/local";

const kranky = Kranky({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-title",
    display: "swap",
});

const island_moments = Island_Moments({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-cursive",
    display: "swap",
});

const merriweather = Merriweather({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-main",
    display: "swap",    
});

const vengeance = Vengeance({
    src: "./fonts/Vengeance.ttf",
    variable: "--font-handwriting",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Message in a Bottle!",
    description: "Share your message with people all across the world and enjoy the messages from others!",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
  children: ReactNode
}) {
    return (
        <html lang="en" className={`${kranky.variable} ${vengeance.variable} ${island_moments.variable} ${merriweather.variable}`}>
            <body>
                <div id="portal-root">
                    {children}
                </div>
            </body>
        </html>
    );
}
