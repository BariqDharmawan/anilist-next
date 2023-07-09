import { css, Global } from '@emotion/react';
import { light } from '../theme';

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

					ul {
						list-style-type: none;
						padding: 0;
					}

					h1,
					h2,
					h3,
					h4,
					h5,
					h6,
					p,
					ul {
						margin: 0;
					}

					.mt-auto {
						margin-top: auto;
					}

					.mb-auto {
						margin-bottom: auto;
					}

					.mb-xxs {
						margin-bottom: ${light.space.xxs};
					}
					.mb-xs {
						margin-bottom: ${light.space.xs};
					}
					.mb-s {
						margin-bottom: ${light.space.s};
					}
					.mb-m {
						margin-bottom: ${light.space.m};
					}
					.mb-l {
						margin-bottom: ${light.space.l};
					}
					.mb-xl {
						margin-bottom: ${light.space.xl};
					}
					.mb-xxl {
						margin-bottom: ${light.space.xxl};
					}
					.mb-xxxl {
						margin-bottom: ${light.space.xxxl};
					}
					.mb-xxxxl {
						margin-bottom: ${light.space.xxxxl};
					}
				`}
			/>
		</>
	);
}
