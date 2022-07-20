import { css } from "@emotion/react";
import { ReactNode, FC } from "react";

import Footer from "./footer";
import Header from "../components/header";
import Main from "./main";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Main
        css={css`
          margin-top: 8px;
        `}
      >
        {children}
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;
