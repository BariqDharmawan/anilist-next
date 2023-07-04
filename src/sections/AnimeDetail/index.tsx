import { AnimateDesc } from '@/src/components/AnimeList/AnimeList.styled';
import Button from '@/src/components/Button';
import CollectionForm from '@/src/components/Collections/CollectionForm';
import Modal from '@/src/components/Modal/Index';
import { useQueryAnimeDetailQuery } from '@/src/graphql/generated';
import useHandleModal from '@/src/hooks/useHandleModal';
import getCollection from '@/src/lib/getCollection';
import { createNewAnimeCollection } from '@/src/lib/utils';
import { AnimeCollection } from '@/src/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
	id: string;
}

export default function AnimeDetail({ id }: Props) {
	const { showModal, handleClose, setShowModal } = useHandleModal();

	const [collections, setCollections] = useState<AnimeCollection[]>([]);

	useEffect(() => {
		setCollections(getCollection());
	}, [showModal]);

	const { data } = useQueryAnimeDetailQuery({
		variables: {
			id: parseInt(id),
			asHtml: true,
		},
	});

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>
				Add To Collection
			</Button>

			<h3>{data?.Media?.title?.romaji}</h3>
			<div>
				{data?.Media?.genres?.map((genre, idx) => (
					<p key={idx}>{genre}</p>
				))}
			</div>
			<div>
				{/* if undefined change placeholder */}
				<Image
					src={
						data?.Media?.coverImage?.large ??
						'https://placehold.co/600x400'
					}
					alt='cover anime'
					width={320}
					height={160}
				/>
			</div>
			<h4>Rankings</h4>
			{data?.Media?.rankings?.map(ranking => (
				<div key={ranking?.id}>
					<p>Year: {ranking?.year}</p>
					<p>Rank: {ranking?.rank}</p>
				</div>
			))}
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

			<Modal isShow={showModal} handleClose={handleClose}>
				<CollectionForm
					initTab='add'
					animeId={id}
					afterCreate={collectionName => {
						createNewAnimeCollection(collectionName, [id]);
						handleClose();
					}}
					{...{ handleClose, collections }}
				/>
			</Modal>
		</div>
	);
}
