import { light } from '@/src/theme';
import styled from '@emotion/styled';

export const ListVerticalStyle = styled.ul`
	li {
		position: relative;
		padding-left: 1rem;

		&:not(:last-child) {
			margin-bottom: 1rem;
		}

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 5px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: ${light.color.gGoto};
		}
	}
`;
