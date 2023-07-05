import useHandleModal from '@/src/hooks/useHandleModal';
import { ParamSlug } from '@/src/lib/allInterface';
import AnimeDetail from '@/src/sections/AnimeDetail';
import { AnimeCollection } from '@/src/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getCollection from '@/src/lib/getCollection';
import { useQueryAnimeDetailQuery } from '@/src/graphql/generated';
import { createNewAnimeCollection } from '@/src/lib/utils';
import CollectionForm from '@/src/components/Collections/CollectionForm';
import Modal from '@/src/components/Modal/Index';
import { AnimateDesc } from '@/src/components/AnimeList/AnimeList.styled';
import Button from '@/src/components/Button';
import { Badge } from '@/src/components/Badge/Badge';
import Container from '@/src/components/Container/Index';
import { light } from '@/src/theme';
import ImageDefaultError from '@/src/components/Img/ImageDefaultError';

import { BiBookmark, BiSolidBookmark } from 'react-icons/bi';

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
			<article
				style={{
					display: 'flex',
				}}>
				<div
					style={{
						width: '20%',
						paddingRight: '1rem',
						borderRight: `1px solid ${light.color.gray300}`,
					}}>
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
								borderRadius: '10px',
							}}
							fill
						/>
					</div>
				</div>
				<div
					style={{
						width: '80%',
						padding: '0 1rem',
					}}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<h1 style={{ margin: 0, color: light.color.gray800 }}>
							{data?.Media?.title?.romaji}
						</h1>
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

					<div
						style={{
							display: 'flex',
							gap: '1rem',
							margin: '1.25rem 0 2rem',
						}}>
						{data?.Media?.genres?.map((genre, idx) => (
							<Badge key={idx}>{genre}</Badge>
						))}
					</div>

					<div
						style={{
							marginBottom: '10px',
						}}>
						<h4 style={{ marginBottom: '12px' }}>Rankings</h4>
						<ul style={{ display: 'inline-block' }}>
							{data?.Media?.rankings?.map(ranking => (
								<li
									key={ranking?.id}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										gap: '1rem',
										marginBottom: '0.5rem',
									}}>
									<p style={{ margin: 0 }}>
										Year: {ranking?.year}
									</p>
									<p style={{ margin: 0 }}>
										Rank: {ranking?.rank}
									</p>
								</li>
							))}
						</ul>
					</div>

					{data?.Media?.description && (
						<div>
							<h3>Description</h3>

							<AnimateDesc
								dangerouslySetInnerHTML={{
									__html: data.Media.description,
								}}
							/>
						</div>
					)}
				</div>
			</article>

			<Modal isShow={showModal} handleClose={handleClose}>
				<CollectionForm
					initTab='add'
					listAnime={[params.slug]}
					afterCreate={collectionName => {
						createNewAnimeCollection(collectionName, [params.slug]);
						handleClose();
					}}
					{...{ handleClose, collections }}
				/>
			</Modal>
		</Container>
	);
}
