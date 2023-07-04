import { light } from '@/src/theme';
import styled from '@emotion/styled';

export const StyledPagination = styled.ul`
	display: flex;
	gap: 1rem;
	margin: 1rem auto 0;
	align-items: center;
`;

export const PaginationPage = styled.span`
	font-size: 1rem;
	font-weight: 500;
`;

export const PaginationLinkStyle = styled.li`
	font-size: 1rem;
	width: 1.75rem;
	display: flex;
	height: 1.75rem;
	overflow: hidden;
	border-radius: 50%;
	color: ${light.color.gGoto};
	text-transform: uppercase;

	a {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: inherit;

		.icon {
			display: flex;
			font-size: 1.25rem;
		}
	}

	&[data-active='false'] {
		a {
			background-color: transparent;
			color: ${light.color.gGoto};
		}
	}

	&[data-active='true'] {
		a {
			background-color: ${light.color.gGoto};
			color: white;
		}
	}
`;
