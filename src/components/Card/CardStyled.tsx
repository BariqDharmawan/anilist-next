import { light } from '@/src/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface CardBaseProp {
	theme: {
		boxShadow: {
			card: string;
		};
		borderRadius: {
			m: string;
		};
		space: {
			xl: string;
		};
	};
}

const CardBase = styled.div`
	box-shadow: ${props => props.theme.boxShadow.card};
	border-radius: ${props => props.theme.borderRadius.m};
`;

const CardBodyXL = styled.div`
	padding: ${props => props.theme.space.xl};
`;

const CardBodySM = styled.div`
	padding: ${props => props.theme.space.s};
`;

const CardCover = styled.div`
	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		background-color: ${light.color.gray100};
		border-radius: 4px 4px 0 0;
		object-fit: cover;
		transition: all 200ms;

		&:hover {
			transform: scale(1.25);
		}
	}
`;

export { CardBodySM, CardBodyXL, CardBase, CardCover };
