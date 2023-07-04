import { AnimeListContainer } from '../AnimeList/AnimeList.styled'
import { PropsWithChildren } from 'react'
import { PaginationPage, StyledPagination } from './Pagination.styled'
import Button from '../Button'
import { NextRouter } from 'next/router'

interface Props {
	isLoading?: boolean
	page: number
	availablePages: number[] | null
	router: NextRouter
}

const PaginationWrapper = ({
	router,
	availablePages = null,
	page,
	isLoading = false,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<AnimeListContainer>
			{children}
			<StyledPagination>
				<Button
					disabled={isLoading || page <= 1}
					onClick={() => router.push(`?page=${page - 1}`)}>
					prev
				</Button>

				{availablePages?.map(eachPage => (
					<Button
						key={`page-${eachPage}`}
						disabled={eachPage === page}
						onClick={() => router.push(`?page=${eachPage}`)}>
						{eachPage}
					</Button>
				))}

				<Button
					disabled={isLoading}
					onClick={() => router.push(`?page=${page + 1}`)}>
					next
				</Button>
			</StyledPagination>
		</AnimeListContainer>
	)
}

export default PaginationWrapper
