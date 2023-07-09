import useHandleModal from '@/src/hooks/useHandleModal';
import { ParamSlug } from '@/src/lib/allInterface';
import { AnimeCollection } from '@/src/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getCollection from '@/src/lib/getCollection';
import { useQueryAnimeDetailQuery } from '@/src/graphql/generated';
import { addToCollection } from '@/src/lib/utils';
import CollectionForm from '@/src/components/Collections/CollectionForm';
import Modal from '@/src/components/Modal/Index';
import { AnimateDesc } from '@/src/components/AnimeList/AnimeList.styled';
import Button from '@/src/components/Button';
import { Badge } from '@/src/components/Badge/Badge';
import Container from '@/src/components/Container/Index';
import { light } from '@/src/theme';
import ImageDefaultError from '@/src/components/Img/ImageDefaultError';

import { BiBookmark, BiSolidBookmark } from 'react-icons/bi';
import {
	DetailCover,
	DetailDesc,
	DetailRow,
	DetailTag,
} from '@/src/components/AnimeDetail/AnimeDetail.styled';

export default function Detail() {
	const router = useRouter();
	const params = router.query as ParamSlug;

	const { showModal, handleClose, setShowModal } = useHandleModal();

	const [collections, setCollections] = useState<AnimeCollection[]>([]);

	useEffect(() => {
		setCollections(getCollection());
	}, [showModal]);

	const { data } = useQueryAnimeDetailQuery({
		variables: {
			id: parseInt(params.slug),
			asHtml: true,
		},
	});

	return (
		<Container
			style={{
				padding: '1.5rem 0',
			}}>
			<DetailRow>
				<DetailCover>
					<div
						style={{
							height: '300px',
							position: 'relative',
						}}>
						<ImageDefaultError
							data-img={data?.Media?.coverImage?.large}
							src={data?.Media?.coverImage?.large}
							alt='cover anime'
							style={{
								objectFit: 'cover',
								borderRadius: light.borderRadius.m,
							}}
							fill
						/>
					</div>
				</DetailCover>
				<DetailDesc>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<h1>{data?.Media?.title?.romaji}</h1>
						<Button
							onClick={() => setShowModal(true)}
							style={{
								cursor: collections.some(
									collection => collection.id === params.slug
								)
									? 'not-allowed'
									: 'auto',
								pointerEvents: collections.some(
									collection => collection.id === params.slug
								)
									? 'none'
									: 'auto',
							}}>
							{collections.some(
								collection => collection.id === params.slug
							) ? (
								<BiSolidBookmark
									size='1.5rem'
									color={light.color.gGoto}
									style={{
										pointerEvents: 'none',
										cursor: 'not-allowed',
									}}
								/>
							) : (
								<BiBookmark size='1.5rem' />
							)}
						</Button>
					</div>

					<DetailTag
						gap='1rem'
						style={{
							margin: '1.25rem 0 2rem',
						}}>
						{data?.Media?.genres?.map((genre, idx) => (
							<Badge key={idx}>{genre}</Badge>
						))}
					</DetailTag>

					<div
						style={{
							marginBottom: '1rem',
							color: light.color.gray900,
						}}>
						<p
							style={{
								fontSize: light.textSize.l,
								fontWeight: 'bold',
								marginBottom: light.space.xs,
							}}>
							Ratings
						</p>
						{data?.Review?.score} / 100
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<p
							style={{
								fontSize: light.textSize.l,
								fontWeight: 'bold',
								marginBottom: light.space.xs,
							}}>
							Number of episodes
						</p>
						<p>{data?.Media?.episodes} episodes</p>
					</div>

					<div
						style={{
							marginBottom: light.space.s,
						}}>
						<p
							style={{
								fontSize: light.textSize.l,
								marginBottom: light.space.xs,
								fontWeight: 'bold',
							}}>
							Rankings
						</p>
						<ul style={{ display: 'inline-block' }}>
							{data?.Media?.rankings?.map(ranking => (
								<li
									key={ranking?.id}
									style={{
										display: 'block',
										columnCount: '2',
										marginBottom: '0.5rem',
									}}>
									<p>Year: {ranking?.year}</p>
									<p>Rank: {ranking?.rank}</p>
								</li>
							))}
						</ul>
					</div>

					{data?.Media?.description && (
						<div>
							<p
								style={{
									fontSize: light.textSize.l,
									fontWeight: 'bold',
									marginBottom: light.space.xs,
								}}>
								Description
							</p>

							<AnimateDesc
								dangerouslySetInnerHTML={{
									__html: data.Media.description,
								}}
							/>
						</div>
					)}
				</DetailDesc>
			</DetailRow>

			<Modal isShow={showModal} handleClose={handleClose}>
				<CollectionForm
					initTab='add'
					listAnime={[params.slug]}
					afterCreate={collectionName => {
						addToCollection(collectionName, [params.slug]);
						handleClose();
					}}
					{...{ handleClose, collections }}
				/>
			</Modal>
		</Container>
	);
}
