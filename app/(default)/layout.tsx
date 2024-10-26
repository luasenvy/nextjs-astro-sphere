import localFont from "next/font/local";

import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { author, logo, site, social } from "@/config";

const atkinson = localFont({
  src: [
    {
      path: "../../public/fonts/atkinson/atkinson-regular.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/atkinson/atkinson-bold.woff",
      weight: "700",
    },
  ],
  display: "swap",
  weight: "45 920",
});

export default async function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <body className={atkinson.className}>
      <Header site={site} logo={logo} />
      <Drawer />
      <main>{children}</main>
      <Footer site={site} author={author} social={social} logo={logo} />
    </body>
  );
}
