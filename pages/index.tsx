import Button from '@/src/components/Button'
import Card from '@/src/components/Card'
import ImageDefaultError from '@/src/components/Img/ImageDefaultError'
import { useQueryMediaPageQuery } from '@/src/graphql/generated'
import {
	PaginationPage,
	StyledPagination,
} from '@/src/components/Pagination/Pagination.styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { PropsWithChildren } from 'react'
import {
	AnimeListContainer,
	AnimeListWrapper,
	AnimeTitle,
	CoverAnime,
} from '@/src/components/AnimeList/AnimeList.styled'

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

	const PaginationWrapper = ({
		isLoading = false,
		children,
	}: PropsWithChildren<{ isLoading?: boolean }>) => {
		return (
			<AnimeListContainer>
				<StyledPagination>
					<Button
						disabled={isLoading || page <= 1}
						onClick={() => router.push(`?page=${page - 1}`)}>
						prev
					</Button>
					<PaginationPage>{page}</PaginationPage>
					<Button
						disabled={isLoading}
						onClick={() => router.push(`?page=${page + 1}`)}>
						next
					</Button>
				</StyledPagination>
				{children}
			</AnimeListContainer>
		)
	}

	if (loading) {
		return (
			<PaginationWrapper isLoading>
				<div>loading...</div>
			</PaginationWrapper>
		)
	}

	if (error) {
		console.log(error.message)
		return <div>error</div>
	}

	if (!data) {
		return <div>data wast exist</div>
	}

	return (
		<PaginationWrapper>
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
