import styled from '@emotion/styled'
import { light } from '@/src/theme/index'
import { laptop } from '@/src/theme/mediaQuery'

export const AnimeListContainer = styled.div`
	display: grid;
	max-width: ${props => props.theme.breakpoint.l};
	margin: auto;
	padding: 1rem;
`

export const AnimeListWrapper = styled.div`
	margin-top: 24px;
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(2, minmax(0, 1fr));

	@media screen and (min-width: ${laptop}) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}
`

export const CoverAnime = styled.div`
	position: relative;
	width: 100%;
	height: 100px;
	overflow: hidden;
	background-color: ${light.color.gray100};
	border-radius: 4px;

	img {
		object-fit: cover;
	}

	@media screen and (min-width: ${laptop}) {
		height: 248px;
	}
`

export const AnimeTitle = styled.h2`
	font-weight: 500;
	font-size: 0.8rem;
	text-transform: capitalize;
`

export const AnimateDesc = styled.div`
	p {
		color: red;
	}

	br {
	}
`
