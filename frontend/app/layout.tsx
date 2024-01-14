import { AdvertisingSection, SideMenu } from "@/components";
import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body>
        <div className="h-full flex flex-col items-center ">
          <div className="flex h-full">
            <SideMenu />
            <div className="flex ">
              <main className="grow">{children}</main>
              <AdvertisingSection />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
