import { useState, useEffect } from 'react';
import { AnimeCollection } from '@/src/types';
import getCollection from '@/src/lib/getCollection';
import {
	QueryMediaPageDocument,
	QueryMediaPageQuery,
	QueryMediaPageQueryVariables,
	useQueryMediaPageQuery,
} from '@/src/graphql/generated';
import {
	AnimeListWrapper,
	AnimeTitle,
	CoverAnime,
} from '@/src/components/AnimeList/AnimeList.styled';
import Card from '@/src/components/Card';
import Link from 'next/link';
import ImageDefaultError from '@/src/components/Img/ImageDefaultError';
import { useRouter } from 'next/router';
import client from '../lib/apollo-client';
import Button from '../components/Button';
import ModalEditCollection from '../components/Collections/ModalEditCollection';
import { setCollectionLocalStorage } from '../lib/utils';
import ModalRemoveAnimeCollection, {
	SelectedAnimeRemove,
} from '../components/Collections/ModalRemoveAnimeCollection';

interface Props {
	slug: string;
}

export default function CollectionDetail({ slug }: Props) {
	const router = useRouter();
	const [animeList, setAnimeList] = useState<QueryMediaPageQuery | null>(
		null
	);
	const [collection, setCollection] = useState<AnimeCollection | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [isMoreThanPhone, setIsMoreThanPhone] = useState(false);
	const [selectedRemoveAnime, setSelectedRemoveAnime] =
		useState<SelectedAnimeRemove | null>(null);

	const fetchData = async (_collection: AnimeCollection) => {
		try {
			if (_collection.list.length === 0) {
				setAnimeList(null);
				return;
			}

			const result = await client.query<
				QueryMediaPageQuery,
				QueryMediaPageQueryVariables
			>({
				query: QueryMediaPageDocument,
				variables: {
					page: 1,
					perPage: _collection.list.length,
					where_media_id: _collection.list.map(l => parseInt(l)),
				},
			});
			setAnimeList(result.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const collections = getCollection();

		const _collection = collections.filter(
			collection => collection.id === slug
		);

		if (_collection.length === 0 && typeof window) {
			router.push('/404');
		}

		setCollection(_collection[0]);
		fetchData(_collection[0]);
	}, [slug]);

	useEffect(() => {
		window.matchMedia('(min-width: 768px)').matches &&
			setIsMoreThanPhone(true);
	}, [isMoreThanPhone]);

	if (!collection) {
		return null;
	}

	return (
		<>
			<h3>Collection Name {collection.name}</h3>
			<Button
				style={{ marginBlock: '1rem' }}
				variant='primary'
				onClick={() => setEditMode(true)}>
				Edit Collection
			</Button>
			<AnimeListWrapper>
				{animeList?.Page?.media?.map(anime => {
					const coverCol = isMoreThanPhone ? 'large' : 'medium';
					const imgCover = anime?.coverImage?.[coverCol];

					if (!anime) return null;
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
							<AnimeTitle>{anime.title?.romaji}</AnimeTitle>
							<Button
								style={{ marginBlock: '1rem' }}
								variant='primary'
								onClick={() =>
									setSelectedRemoveAnime({
										id: anime.id.toString(),
										name: anime.title?.romaji!,
									})
								}>
								Remove
							</Button>
						</Card>
					);
				})}
			</AnimeListWrapper>
			{editMode && (
				<ModalEditCollection
					collection={collection}
					setCollections={collections => {
						const _collection = collections.filter(
							collection => collection.id === slug
						);

						setCollection(_collection[0]);
					}}
					handleClose={() => setEditMode(false)}
				/>
			)}
			{selectedRemoveAnime && (
				<ModalRemoveAnimeCollection
					collectionId={slug}
					handleClose={() => setSelectedRemoveAnime(null)}
					setCollection={setCollection}
					selectedAnimeRemove={selectedRemoveAnime}
					afterRemove={collection => {
						setCollection(collection);
						fetchData(collection);
					}}
				/>
			)}
		</>
	);
}
