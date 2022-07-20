import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"li">;

const Li: FC<Props> = (props) => {
  return (
    <li
      css={css`
        margin: 4px 0;
      `}
      {...props}
    />
  );
};

export default Li;
