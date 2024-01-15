import { AdvertisingSection, SideMenu } from "@/components";
import type { Metadata } from "next";
import "../styles/globals.css";
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
      <body>
        <Provider>
          <div className="h-full flex flex-col items-center ">
            <div className="flex h-full">
              <SideMenu />
              <div className="flex ">
                <main className="grow">{children}</main>
                <AdvertisingSection />
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
