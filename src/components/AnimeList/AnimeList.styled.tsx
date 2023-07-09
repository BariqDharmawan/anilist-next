import styled from '@emotion/styled';
import { laptop } from '@/src/theme/mediaQuery';

export const AnimeListContainer = styled.div`
	display: grid;
	width: 100%;
	margin: auto;
`;

export const StyleAnimeWrapper = styled.div`
	margin-top: 1.5rem;
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(2, minmax(0, 1fr));

	@media screen and (min-width: ${laptop}) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}
`;

export const CoverAnime = styled.div`
	height: 150px;
	position: relative;

	@media screen and (min-width: ${laptop}) {
		height: 248px;
	}
`;

export const AnimeTitle = styled.h2`
	font-weight: 500;
	font-size: 0.8rem;
	text-transform: capitalize;
`;

export const AnimateDesc = styled.div``;
