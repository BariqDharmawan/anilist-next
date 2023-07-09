import { light } from '@/src/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonBase = css`
	cursor: pointer;
	border: none;
	outline: none;
	border-radius: 0.5rem;
	padding: 0;
	transition: all 150ms;

	&:disabled {
		opacity: 0.5;
		cursor: auto;
	}
`;

export const ButtonTextBase = css`
	text-transform: capitalize;
	height: 2.5rem;
	padding-inline: 1rem;
`;

export const ButtonIcon = styled.button`
	${ButtonBase}
	display: flex;
	align-items: center;
	background-color: transparent;
`;

export const ButtonTransparent = styled.button`
	${ButtonBase}
	${ButtonTextBase}
	background-color: transparent;
`;

export const ButtonBaseStyled = styled.button`
	${ButtonBase}
	${ButtonTextBase}
	background-color: ${light.color.b800};
	color: white;
`;

export const ButtonOutlineSecondary = styled.button`
	${ButtonBase}
	${ButtonTextBase}

	background-color: transparent;
	border: 1px solid ${light.color.secondary};
`;

export const ButtonOutlinePrimary = styled.button`
	${ButtonBase}
	${ButtonTextBase}

	background-color: transparent;
	border: 1px solid ${light.color.b800};
`;

export const ButtonOutlineDanger = styled.button`
	${ButtonBase}
	${ButtonTextBase}

	color: ${light.color.r500};
	background-color: transparent;
	border: 1px solid ${light.color.r500};

	&:hover {
		background-color: ${light.color.r500};
		color: white;
	}
`;
