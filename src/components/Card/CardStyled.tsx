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

const CardBase = (props: CardBaseProp) => css`
	box-shadow: ${props.theme.boxShadow.card};
	border-radius: ${props.theme.borderRadius.m};
`;

const CardXL = styled.div`
	${CardBase}
	padding: ${props => props.theme.space.xl};
`;

const CardSM = styled.div`
	${CardBase}
	padding: ${props => props.theme.space.s};
`;

export { CardSM, CardXL };
