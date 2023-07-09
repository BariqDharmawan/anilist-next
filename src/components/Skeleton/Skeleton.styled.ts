import { light } from '@/src/theme';
import styled from '@emotion/styled';

export const SkeletonIconStyle = styled.span`
	background-color: ${light.color.gray200};
	width: 1rem;
	display: block;
	height: 1rem;
`;

export const SkeletonTextStyle = styled.p`
	height: 1rem;
	margin: 0;
	width: 100%;
	background-color: ${light.color.gray300};
`;

export const SkeletonCardDesc = styled.div`
	background-color: transparent;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.5rem;
	flex-grow: 1;
`;

export const SkeletonCard = styled.div`
	border-radius: 0.5rem;
	overflow: hidden;
	border: 1px solid ${light.color.gray300};
`;

export const SkeletonCircle = styled.div<{ size: string }>`
	background-color: ${light.color.gray200};
	width: ${props => props.size};
	height: ${props => props.size};
	border-radius: 50%;
`;
