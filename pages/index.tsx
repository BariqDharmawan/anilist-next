import ImageDefaultError from '@/src/components/Img/ImageDefaultError'
import { useQueryMediaPageQuery } from '@/src/graphql/generated'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
	AnimeListWrapper,
	AnimeTitle,
	CoverAnime,
} from '@/src/components/AnimeList/AnimeList.styled'
import WaitingData from '@/src/components/WaitingData/Index'
import PaginationWrapper from '@/src/components/Pagination/PaginationWrapper'

interface Params extends ParsedUrlQuery {
	page?: string
}

export default function HomePage() {
	const router = useRouter()
	const params = router.query as Params
	const page = params.page !== undefined ? parseInt(params.page) : 1

	const { data, loading, error } = useQueryMediaPageQuery({
		variables: {
			page,
			perPage: Number(process.env.NEXT_PUBLIC_PER_PAGE),
		},
	})

	return loading || error || !data ? (
		<WaitingData loading={loading} error={error || !data} />
	) : (
		<PaginationWrapper isLoading={loading} page={page} router={router}>
			<AnimeListWrapper>
				{data.Page?.media?.map(anime => {
					const imageCover =
						anime?.coverImage?.large ?? anime?.coverImage?.medium

					return (
						<Link href={`/anime/${anime?.id}`} key={anime?.id}>
							<CoverAnime>
								<ImageDefaultError
									src={imageCover}
									alt='cover anime'
									fill
								/>
							</CoverAnime>
							<AnimeTitle>{anime?.title?.romaji}</AnimeTitle>
						</Link>
					)
				})}
			</AnimeListWrapper>
		</PaginationWrapper>
	)
}
