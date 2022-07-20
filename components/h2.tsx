import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h2">;

const H2: FC<Props> = (props) => {
  const id = props.children?.toString();
  return (
    <a
      href={`#${id}`}
      css={css`
        color: #000000;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      `}
    >
      <h2
        id={id}
        css={css`
          margin-top: 28px;
          margin-bottom: 24px;
          padding-bottom: 4px;
          font-size: 1.5rem;
          border-bottom: 2px solid #3f3f3f2b;
          &:before {
            margin-right: 8px;
            font-weight: 500;
            content: "##";
          }
        `}
        {...props}
      />
    </a>
  );
};

export default H2;
