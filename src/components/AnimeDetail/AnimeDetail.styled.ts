import { light } from '@/src/theme';
import { laptop } from '@/src/theme/mediaQuery';
import styled from '@emotion/styled';

export const DetailRow = styled.article`
	display: flex;
	flex-direction: column;

	@media screen and (min-width: ${laptop}) {
		flex-direction: row;
	}
`;

export const DetailCover = styled.div`
	width: 100%;

	@media screen and (min-width: ${laptop}) {
		width: 20%;
		padding-right: 1rem;
		border-right: 1px solid ${light.color.gray300};
	}
`;

export const DetailDesc = styled.div`
	width: 100%;
	padding: 1rem 0;

	@media screen and (min-width: ${laptop}) {
		width: 80%;
		padding: 0 1rem;
	}
`;

export const DetailTag = styled.div<{ gap: string }>`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: ${props => props.gap};
	margin: 1.25rem 0 2rem;
`;
