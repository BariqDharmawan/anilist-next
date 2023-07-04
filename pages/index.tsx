import ImageDefaultError from '@/src/components/Img/ImageDefaultError';
import {
	QueryMediaPageQuery,
	useQueryMediaPageQuery,
} from '@/src/graphql/generated';
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
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import StickyBoxAction from '@/src/components/StickyBoxAction/Index';
import { createPortal } from 'react-dom';

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

	const [localAnime, setLocalAnime] = useState<
		QueryMediaPageQuery | undefined
	>();

	useEffect(() => {
		setLocalAnime(data);
	}, [data]);

	console.log('data', localAnime);

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

	const { isMoreThanPhone } = useMatchMedia();

	const [selectedAnime, setSelectedAnime] = useState<number[]>([]);
	const handleAddToCollection = (animeId: number) => {
		setSelectedAnime(prevSelectedAnime => {
			return prevSelectedAnime.includes(animeId)
				? prevSelectedAnime.filter(id => id !== animeId)
				: [...prevSelectedAnime, animeId];
		});
	};

	console.log('selectedAnime', selectedAnime);

	return loading || error || !data ? (
		<WaitingData
			loading={loading}
			error={Boolean(error)}
			dataNotExist={!data}
		/>
	) : (
		<AnimeListContainer>
			<PaginationWrapper
				page={page}
				availablePages={pagePaginationShowed}
			/>

			<AnimeListWrapper>
				{data.Page?.media?.map(anime => {
					const coverCol = isMoreThanPhone ? 'large' : 'medium';
					const imgCover = anime?.coverImage?.[coverCol];

					return (
						<Card
							padding='s'
							key={anime?.id}
							cover={
								<CoverAnime>
									<Link href={`/anime/${anime?.id}`}>
										<ImageDefaultError
											src={imgCover}
											alt='cover anime'
											fill
										/>
									</Link>
								</CoverAnime>
							}>
							<div>
								<label
									htmlFor={`checkbox-anime-${anime?.id}`}
									style={{
										position: 'relative',
										cursor: 'pointer',
									}}>
									<input
										type='checkbox'
										id={`checkbox-anime-${anime?.id}`}
										value={anime?.id}
										style={{
											position: 'absolute',
											left: '-999999999',
											opacity: 0,
											width: 0,
											height: 0,
										}}
										onClick={e =>
											handleAddToCollection(
												Number(
													(
														e.currentTarget as HTMLInputElement
													).value
												)
											)
										}
									/>

									{selectedAnime.includes(anime!.id) ? (
										<BiSolidBookmark />
									) : (
										<BiBookmark />
									)}
								</label>
							</div>

							<AnimeTitle>{anime?.title?.romaji}</AnimeTitle>
						</Card>
					);
				})}
			</AnimeListWrapper>

			{selectedAnime.length &&
				createPortal(<StickyBoxAction />, document.body)}
		</AnimeListContainer>
	);
}
