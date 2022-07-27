import { css } from "@emotion/react";
import { ReactNode, FC } from "react";

import Footer from "./Footer";
import Header from "../components/Header";
import Main from "./Main";

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
