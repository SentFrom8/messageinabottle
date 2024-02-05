import type { Metadata } from "next";
import "./styles/global.css";
import { ReactNode } from "react";
import { Karla } from "next/font/google";
import Vengeance from "next/font/local";

const karla = Karla({
    subsets: ["latin"],
    variable: "--font-main",
    display: "swap",
});

const veneance = Vengeance({
    src: "./fonts/Vengeance.ttf",
    variable: "--font-handwriting",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Message in a Bottle!",
};

export default function RootLayout({
    children,
}: {
  children: ReactNode
}) {
    return (
        <html lang="en" className={`${karla.variable} ${veneance.variable}`}>
            <body>
                <div id="portal-root">
                    {children}
                </div>
            </body>
        </html>
    );
}
