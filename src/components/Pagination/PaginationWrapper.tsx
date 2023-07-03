import { AnimeListContainer } from '../AnimeList/AnimeList.styled'
import { PropsWithChildren } from 'react'
import { PaginationPage, StyledPagination } from './Pagination.styled'
import Button from '../Button'
import { NextRouter } from 'next/router'

const PaginationWrapper = ({
	router,
	page,
	isLoading = false,
	children,
}: PropsWithChildren<{
	isLoading?: boolean
	page: number
	router: NextRouter
}>) => {
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

export default PaginationWrapper
