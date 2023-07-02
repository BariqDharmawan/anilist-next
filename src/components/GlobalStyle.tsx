import { css, Global, ClassNames } from "@emotion/react";

// This Component Just for Example Propose
export default function GlobalStyle() {
  return (
    <>
      <Global
        styles={css`
          html {
            background-color: gray;
          }
          .global-color {
          }
          .some-class {
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: cyan;
            }
          }
        `}
      />
    </>
  );
}
