import { useState } from 'react';
import Link from 'next/link';

import { getAnimeCollection } from '@/src/lib/utils';
import ClientOnly from '@/src/components/ClientOnly';
import { useQueryMediaCollectionQuery } from '@/src/graphql/generated';
import { AnimeCollection } from '@/src/types';
import ImageDefaultError from '@/src/components/Img/ImageDefaultError';
import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal/Index';
import CollectionForm from '@/src/components/Collections/CollectionForm';
import ModalRemoveCollection from '@/src/components/Collections/ModalRemoveCollection';
import ModalEditCollection from '@/src/components/Collections/ModalEditCollection';
import {
	AnimeListWrapper,
	AnimeTitle,
	CoverAnime,
} from '@/src/components/AnimeList/AnimeList.styled';
import Card from '@/src/components/Card';
import {
	ButtonActionWrapper,
	CollectionTitle,
} from '@/src/components/Collections/Collection.styled';

interface CollectionListType extends AnimeCollection {
	imageSrc?: string | null;
}

export default function CollectionList() {
	const [modalCollection, setModalCollection] = useState(false);
	const [modalRemove, setModalRemove] = useState<AnimeCollection | null>(
		null
	);
	const [editModalCollection, setEditModalCollection] =
		useState<AnimeCollection | null>(null);
	const [collections, setCollections] = useState(getAnimeCollection());

	const mediaIds: number[] = collections.reduce((result, current) => {
		if (current.list.length > 0) {
			result.push(parseInt(current.list[0]));
		}
		return result;
	}, [] as number[]);

	const { data, loading, error } = useQueryMediaCollectionQuery({
		variables: {
			page: 1,
			perPage: 10,
			where_media_id: mediaIds,
		},
	});

	const medias = data?.Page?.media;

	const collectionList = medias
		? collections.map<CollectionListType>(collection => {
				const imageSrc = medias.filter(
					media => media?.id === parseInt(collection.list[0])
				);

				return {
					...collection,
					imageSrc: imageSrc[0]?.coverImage?.large,
				};
		  })
		: [];

	const handleClose = () => {
		setModalCollection(false);
	};

	return (
		<ClientOnly>
			<Button
				style={{
					marginTop: '1rem',
				}}
				variant='primary'
				onClick={() => setModalCollection(true)}>
				Create New Collection
			</Button>
			<AnimeListWrapper>
				{collectionList.map(collection => (
					<Card padding='s' key={collection.id}>
						<Link
							href={`/collection/${collection.id}`}
							key={collection.id}>
							<CoverAnime>
								<ImageDefaultError
									src={collection.imageSrc}
									alt='cover-img'
									fill
								/>
							</CoverAnime>
							<CollectionTitle>{collection.name}</CollectionTitle>
							<AnimeTitle>
								Contains {collection.list.length} anime
							</AnimeTitle>
						</Link>
						<ButtonActionWrapper>
							<Button
								variant='primary'
								onClick={() =>
									setEditModalCollection(collection)
								}>
								Edit
							</Button>
							<Button
								variant='secondary'
								onClick={() => setModalRemove(collection)}>
								Remove
							</Button>
						</ButtonActionWrapper>
					</Card>
				))}
			</AnimeListWrapper>
			<Modal isShow={modalCollection} handleClose={handleClose}>
				<CollectionForm
					initTab='create'
					collections={collections}
					afterCreate={() => {
						setCollections(getAnimeCollection());
						handleClose();
					}}
					handleClose={handleClose}
				/>
			</Modal>
			<ModalRemoveCollection
				collection={modalRemove}
				setCollections={setCollections}
				handleClose={() => setModalRemove(null)}
			/>
			{editModalCollection && (
				<ModalEditCollection
					collection={editModalCollection}
					setCollections={setCollections}
					handleClose={() => setEditModalCollection(null)}
				/>
			)}
			`
		</ClientOnly>
	);
}
