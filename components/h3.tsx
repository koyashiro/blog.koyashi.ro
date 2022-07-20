import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h3">;

const H3: FC<Props> = (props) => {
  return (
    <h1
      css={css`
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 1.5rem;
        font-weight: bold;
        &:before {
          content: "### ";
        }
      `}
      {...props}
    />
  );
};

export default H3;
