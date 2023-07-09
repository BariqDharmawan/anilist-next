import { light } from '@/src/theme';
import { tablet } from '@/src/theme/mediaQuery';
import styled from '@emotion/styled';

export const CollectionTitle = styled.p`
	font-weight: 500;
	font-size: 1.2rem;
	text-transform: capitalize;
`;

export const ButtonActionWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	gap: 0.5rem;
`;

export const CollectionCard = styled.div`
	position: relative;
	background-color: white;
	padding: 1.5rem;
	border-radius: ${props => props.theme.borderRadius.l};
	max-width: ${tablet};
	width: 100%;
	transition: height 300ms ease-in-out;
`;

export const IconCloseWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	top: 16px;
	right: 16px;
	border-radius: 50%;
	transition: background-color 150ms ease-in-out;
	padding: 8px;
	&:hover {
		background-color: rgba(170, 161, 161, 0.2);
	}
`;

export const CollectionSelectedList = styled.div`
	display: flex;
	gap: 8px;
	flex-direction: column;
`;

export const CollectionSelectedName = styled.div`
	font-weight: 500;
	font-size: 1rem;
	cursor: pointer;
	text-transform: capitalize;
	position: relative;
	padding: 1rem 1.5rem;

	&:not(:last-child) {
		border-bottom: 1px solid ${light.color.gray200};
	}

	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		translate: 0 -50%;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		transition: all 150ms;
		background-color: ${light.color.gray300};
	}

	&:hover::before {
		background-color: ${light.color.gGoto};
	}
`;
