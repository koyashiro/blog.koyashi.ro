import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h5">;

const H5: FC<Props> = (props) => {
  return (
    <h5
      css={css`
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 1.125rem;
        &:before {
          content: "##### ";
        }
      `}
      {...props}
    />
  );
};

export default H5;
