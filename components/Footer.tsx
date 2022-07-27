import { css } from "@emotion/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <small>&copy; koyashiro</small>
    </footer>
  );
};

export default Footer;
