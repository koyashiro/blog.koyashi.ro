import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"p">;

const P: FC<Props> = (props) => {
  return (
    <p
      css={css`
        margin: 12px 0;
      `}
      {...props}
    />
  );
};

export default P;
