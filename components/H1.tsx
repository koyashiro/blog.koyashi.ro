import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h1">;

const H1: FC<Props> = (props) => {
  return (
    <h1
      css={css`
        margin: 0;
        font-size: 2rem;
      `}
      {...props}
    />
  );
};

export default H1;
