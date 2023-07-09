import styled from '@emotion/styled';
import { light } from '@/src/theme';
import {
	ButtonBase,
	ButtonTextBase,
} from '@/src/components/Button/Button.styled';

export const TabsContainer = styled.div`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
`;

export const TabsItemStyle = styled.button`
	${ButtonBase}
	${ButtonTextBase}
    border-radius: 0.5rem 0.5rem 0 0;
	padding-inline: 0.5rem;
	background-color: transparent;
	border-bottom: 2px solid ${light.color.gray300};

	&:hover {
		background-color: ${light.color.gray100};
	}

	&.active {
		border-color: ${light.color.gGoto};
	}
`;
