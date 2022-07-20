import { css } from "@emotion/react";
import Link from "next/link";
import { ComponentProps, FC } from "react";
import { BiLinkExternal } from "react-icons/bi";

type Props = ComponentProps<"a">;

const A: FC<Props> = (props) => {
  const href = props.href ?? "";
  const isExternal = /^https?:\/\//.test(href);
  const aCss = css`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #164cff;
    &:hover {
      text-decoration: underline;
    }
  `;

  if (isExternal) {
    return (
      <a {...props} target="_blank" rel="noreferrer" css={aCss}>
        {props.children}
        <BiLinkExternal css={aCss} />
      </a>
    );
  } else {
    return (
      <Link href={href} passHref>
        <a {...props} css={aCss}>
          {props.children}
        </a>
      </Link>
    );
  }
};

export default A;
