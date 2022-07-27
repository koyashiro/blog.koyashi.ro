import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"ol">;

const Ol: FC<Props> = (props) => {
  return (
    <ol
      css={css`
        margin: 8px 0;
      `}
      {...props}
    />
  );
};

export default Ol;
