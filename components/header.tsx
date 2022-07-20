import { css } from "@emotion/react";
import Link from "next/link";
import { ComponentProps, FC } from "react";
import { FaGithub } from "react-icons/fa";

type Props = ComponentProps<"header">;

const Header: FC<Props> = (props) => {
  return (
    <header
      css={css`
        display: flex;
        height: 50px;
        background-color: #ffffff;
        border-bottom: 1px solid #e3e3e3;
      `}
      {...props}
    >
      <div
        css={css`
          max-width: 900px;
          width: 100%;
          margin: auto;
          padding: 0 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Link href="/" passHref>
          <a
            css={css`
              display: flex;
              justify-content: flex-start;
              color: #000000;
              font-size: 1.5rem;
              text-decoration: none;
              font-weight: 600;
              &:hover {
                text-decoration: underline;
              }
            `}
          >
            blog.koyashi.ro
          </a>
        </Link>

        <a
          href="https://github.com/koyashiro"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 24px;
            color: #000000;
          `}
        >
          <FaGithub />
        </a>
      </div>
    </header>
  );
};

export default Header;
