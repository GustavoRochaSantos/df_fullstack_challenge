import { AdvertisingSection, SideMenu } from "@/components";
import type { Metadata } from "next";
import "../../styles/globals.css";
import Provider from "@/util/Providers";

export const metadata: Metadata = {
  title: "DFCom Fullstack Challenge",
  description: "Blog style X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
