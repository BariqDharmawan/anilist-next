import ImageDefaultError from '@/src/components/Img/ImageDefaultError';
import { useQueryMediaPageQuery } from '@/src/graphql/generated';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	AnimeListContainer,
	AnimeListWrapper,
	AnimeTitle,
	CoverAnime,
} from '@/src/components/AnimeList/AnimeList.styled';
import WaitingData from '@/src/components/WaitingData/Index';
import PaginationWrapper from '@/src/components/Pagination/PaginationWrapper';
import Card from '@/src/components/Card';
import useMatchMedia from '@/src/hooks/useMatchMedia';
import { ParamPage } from '@/src/lib/allInterface';

export default function HomePage() {
	const router = useRouter();
	const params = router.query as ParamPage;
	const page = params.page !== undefined ? parseInt(params.page) : 1;

	const { data, loading, error } = useQueryMediaPageQuery({
		variables: {
			page,
			perPage: Number(process.env.NEXT_PUBLIC_PER_PAGE),
		},
	});

	console.log('data', data);

	let pageStart =
		(data?.Page?.pageInfo?.currentPage ?? 1) <
		(data?.Page?.pageInfo?.perPage ?? 1)
			? 1
			: data?.Page?.pageInfo?.currentPage ?? 1;
	let pageEnd = data?.Page?.pageInfo?.perPage ?? 1;

	if (
		(data?.Page?.pageInfo?.currentPage ?? 1) >=
		(data?.Page?.pageInfo?.perPage ?? 1)
	) {
		const isCurrPageLessThanPerPage =
			Number(data?.Page?.pageInfo?.currentPage) <
			Number(data?.Page?.pageInfo?.perPage);
		if (isCurrPageLessThanPerPage) {
			pageStart = 1;
		}

		pageEnd =
			(data?.Page?.pageInfo?.currentPage ?? 1) +
			(data?.Page?.pageInfo?.perPage ?? 1);
	}

	console.log(`pageStart: ${pageStart}, pageEnd: ${pageEnd}`);

	const pagePaginationShowed = Array.from(
		{ length: pageEnd - pageStart + 1 },
		(_, i) => pageStart + i
	);

	const { isMoreThanPhone, isMoreThanTablet, isMoreThanDesktop } =
		useMatchMedia();

	return loading || error || !data ? (
		<WaitingData
			loading={loading}
			error={Boolean(error)}
			dataNotExist={!data}
		/>
	) : (
		<AnimeListContainer>
			<PaginationWrapper
				isLoading={loading}
				page={page}
				availablePages={pagePaginationShowed}
				router={router}
			/>

			<AnimeListWrapper>
				{data.Page?.media?.map(anime => {
					const coverCol = isMoreThanPhone ? 'large' : 'medium';
					const imgCover = anime?.coverImage?.[coverCol];

					return (
						<Card padding='s' key={anime?.id}>
							<Link href={`/anime/${anime?.id}`}>
								<CoverAnime>
									<ImageDefaultError
										src={imgCover}
										alt='cover anime'
										fill
									/>
								</CoverAnime>
								<AnimeTitle>{anime?.title?.romaji}</AnimeTitle>
							</Link>
						</Card>
					);
				})}
			</AnimeListWrapper>
		</AnimeListContainer>
	);
}
