import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ButtonBase = css`
	height: 2.5rem;
	cursor: pointer;
	border: none;
	outline: none;
	text-transform: capitalize;
	border-radius: 8px;
	padding: 0;

	&:disabled {
		opacity: 0.5;
		cursor: auto;
	}
`;

export const ButtonTransparent = styled.button`
	${ButtonBase}
	background-color: transparent;
`;

export const ButtonBaseStyled = styled.button`
	background-color: #1e293b;
	color: white;

	${ButtonBase}
`;
