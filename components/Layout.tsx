import { ReactNode, FC } from "react";
import Link from "next/link";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <header className="flex justify-center py-8">
        <Link href="/" className="text-4xl font-extrabold hover:underline">
          {"koyashiro's blog"}
        </Link>
      </header>

      <main>{children}</main>

      <footer className="flex justify-center mt-4">
        <small className="text-base">{"© koyashiro"}</small>
      </footer>
    </div>
  );
};

export default Layout;
