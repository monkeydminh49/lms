"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { StoreProvider } from "@/redux/storeProvider";
import paths from "@/app/paths";
import Header from "@/components/header/user/header";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const router = useRouter();
  const pathName = usePathname();
  const notShowHeaderAndFooter = () => {
    return (
      pathName != paths.logIn &&
      pathName != paths.register &&
      pathName != paths.sendVerificationEmail &&
      pathName != paths.verifyEmail
    );
  };

  const isHeaderFixed = () => {
    return pathName === paths.library;
  };
  // console.log(pathName);
  return (
    <StoreProvider>
      {/*<MyApp></MyApp>*/}

      <html lang="en">
        {/*{window.location.pathname === paths.logIn ? <></> : <Header></Header>}*/}

        <body className={inter.className + "relative"}>
          <div>
            <Head>
              <title>Đèn sách</title>
            </Head>
          </div>

          {/* <Link rel="preconnect" href="https://fonts.googleapis.com" />
          <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
            rel="stylesheet"
          ></link>
          <Link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;600;700&display=swap"
          ></Link>
          <Link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"
            rel="stylesheet"
          ></Link>
          <Link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          ></Link>
          <div
            className={`${isHeaderFixed() ? `fixed  bg-white/${Math.min(100, parseInt((scrollY - 100) / 5 + ".0", 10) * 5)}` : ` sticky top-0 bg-white `} z-[500] w-full  `}
          >
            {notShowHeaderAndFooter() && <Header />}
          </div>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          {notShowHeaderAndFooter() && <Footer />}
        </body>
      </html>
    </StoreProvider>
  );
}
