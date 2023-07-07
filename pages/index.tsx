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
import { BiBookmark, BiChevronDown, BiSolidBookmark } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import StickyBoxAction from '@/src/components/StickyBoxAction/Index';
import { createPortal } from 'react-dom';
import { light } from '@/src/theme';
import ListVertical from '@/src/components/ListVertical';
import {
	CollapseDetail,
	CollapseStyle,
} from '@/src/components/Collapsible/Collapsible.styled';
import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal/Index';
import useHandleModal from '@/src/hooks/useHandleModal';
import CollectionForm from '@/src/components/Collections/CollectionForm';
import { createNewAnimeCollection } from '@/src/lib/utils';
import { AnimeCollection } from '@/src/types';
import getCollection from '@/src/lib/getCollection';

export default function HomePage() {
	const router = useRouter();
	const params = router.query as ParamPage;
	const page = params.page !== undefined ? parseInt(params.page) : 1;

	const { showModal, handleClose, setShowModal } = useHandleModal();

	const [collections, setCollections] = useState<AnimeCollection[]>([]);

	const [heightStickyBox, setHeightStickyBox] = useState<string | undefined>(
		'1rem'
	);

	const { data, loading, error } = useQueryMediaPageQuery({
		variables: {
			page,
			perPage: Number(process.env.NEXT_PUBLIC_PER_PAGE),
		},
	});

	const [localAnime, setLocalAnime] = useState<
		QueryMediaPageQuery | undefined
	>();

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

	const pagePaginationShowed = Array.from(
		{ length: pageEnd - pageStart + 1 },
		(_, i) => pageStart + i
	);

	const { isMoreThanPhone } = useMatchMedia();

	const removeAnimeFromSelected = (
		listAnimeSelected: string[],
		animeToRemove: string
	) => {
		return listAnimeSelected.filter(
			eachAnime => animeToRemove !== eachAnime
		);
	};

	const [listSelectedAnime, setlistSelectedAnime] = useState<string[]>([]);
	const handleAddToCollection = (animeSelected: string) => {
		setlistSelectedAnime(prevlistSelectedAnime => {
			return prevlistSelectedAnime.includes(animeSelected)
				? removeAnimeFromSelected(prevlistSelectedAnime, animeSelected)
				: [...prevlistSelectedAnime, animeSelected];
		});
	};

	const getStickyBoxHeight = () => {
		const stickyBoxEl = document.querySelector('#sticky-selected-anime');
		stickyBoxEl && setHeightStickyBox(`${stickyBoxEl.clientHeight}px`);
	};

	useEffect(() => {
		setLocalAnime(data);
		setCollections(getCollection());

		listSelectedAnime.length > 0 && getStickyBoxHeight();
	}, [data, showModal, listSelectedAnime, heightStickyBox]);

	console.log('heightStickyBox', heightStickyBox);

	return loading || error || !data ? (
		<WaitingData
			loading={loading}
			error={Boolean(error)}
			dataNotExist={!data}
		/>
	) : (
		<>
			<AnimeListContainer style={{ paddingBottom: heightStickyBox }}>
				<PaginationWrapper
					page={page}
					availablePages={pagePaginationShowed}
				/>

				<AnimeListWrapper>
					{data.Page?.media?.map(anime => {
						const coverCol = isMoreThanPhone ? 'large' : 'medium';
						const imgCover = anime?.coverImage?.[coverCol];

						if (anime) {
							return (
								<Card
									padding='s'
									key={anime.id}
									cover={
										<CoverAnime>
											<Link href={`/anime/${anime.id}`}>
												<ImageDefaultError
													src={imgCover}
													alt='cover anime'
													fill
												/>
											</Link>
										</CoverAnime>
									}>
									<div>
										<button
											onClick={e =>
												handleAddToCollection(
													anime.id.toString()
												)
											}
											style={{
												position: 'relative',
												cursor: 'pointer',
												backgroundColor: 'transparent',
												borderStyle: 'none',
												padding: '0',
											}}>
											{listSelectedAnime &&
											listSelectedAnime.includes(
												anime.id.toString()
											) ? (
												<BiSolidBookmark
													color={light.color.gGoto}
												/>
											) : (
												<BiBookmark />
											)}
										</button>
									</div>

									<AnimeTitle>
										{anime.title?.romaji}
									</AnimeTitle>
								</Card>
							);
						}
					})}
				</AnimeListWrapper>

				{listSelectedAnime.length > 0
					? createPortal(
							<StickyBoxAction id='sticky-selected-anime'>
								<CollapseStyle>
									<summary
										onClick={() => getStickyBoxHeight()}>
										<span style={{ fontWeight: 'bold' }}>
											{listSelectedAnime.length} item
											selected
										</span>
										<BiChevronDown size='1.5rem' />
									</summary>

									<CollapseDetail
										style={{
											marginTop: '1rem',
										}}>
										<ListVertical
											itemList={(() => {
												return listSelectedAnime.map(
													eachSelected => {
														return data.Page?.media?.filter(
															eachData =>
																eachData?.id.toString() ===
																eachSelected
														)[0]?.title?.romaji!;
													}
												);
											})()}></ListVertical>
									</CollapseDetail>
								</CollapseStyle>

								<Button
									variant='primary'
									style={{ marginTop: '1rem', width: '100%' }}
									onClick={() => setShowModal(true)}>
									Add to collection
								</Button>
							</StickyBoxAction>,
							document.body
					  )
					: ''}
			</AnimeListContainer>

			<Modal isShow={showModal} handleClose={handleClose}>
				<CollectionForm
					tabs
					initTab='add'
					listAnime={listSelectedAnime}
					afterCreate={collectionName => {
						createNewAnimeCollection(
							collectionName,
							listSelectedAnime
						);
						handleClose();
					}}
					{...{ handleClose, collections }}
				/>
			</Modal>
		</>
	);
}
