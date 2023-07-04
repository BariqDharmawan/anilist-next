import { css, Global } from '@emotion/react';

// Warning this Component for GlobalStyle
export default function GlobalStyle() {
	return (
		<>
			<Global
				styles={css`
					@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap');

					html,
					body {
						font-family: 'Roboto', sans-serif;
						margin: 0;
						padding: 0;
						background-color: white;
					}

					*,
					*::before,
					*::after {
						box-sizing: border-box;
					}

					a {
						text-decoration: none;
						color: inherit;
					}
				`}
			/>
		</>
	);
}
