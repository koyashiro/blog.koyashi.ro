import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"ul">;

const Ul: FC<Props> = (props) => {
  return (
    <ul
      css={css`
        margin: 8px 0;
      `}
      {...props}
    />
  );
};

export default Ul;
