import { css, Global } from '@emotion/react'

// Warning this Component for GlobalStyle
export default function GlobalStyle() {
	return (
		<>
			<Global
				styles={css`
					html,
					body {
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
						color: black;
					}
				`}
			/>
		</>
	)
}
