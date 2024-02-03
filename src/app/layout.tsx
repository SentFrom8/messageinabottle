import type { Metadata } from "next";
import  Layout  from "./styles/Layout.module.css";
import "./styles/global.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Message in a Bottle!",
};

export default function RootLayout({
    children,
}: {
  children: ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div className={Layout.main}>
                    {children}
                </div>
            </body>
        </html>
    );
}
