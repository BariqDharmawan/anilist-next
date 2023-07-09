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
	StyleAnimeWrapper,
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
import AnimeWrapper from '../components/AnimeList';
import { BiSolidEdit } from 'react-icons/bi';

interface Props {
	slug: string;
}

export default function CollectionDetail({ slug }: Props) {
	const router = useRouter();
	const [animeList, setAnimeList] = useState<QueryMediaPageQuery | null>(
		null
	);

	const [isLoading, setIsLoading] = useState(false);

	const [collection, setCollection] = useState<AnimeCollection | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [isMoreThanPhone, setIsMoreThanPhone] = useState(false);
	const [selectedRemoveAnime, setSelectedRemoveAnime] =
		useState<SelectedAnimeRemove | null>(null);

	const fetchData = async (_collection: AnimeCollection) => {
		setIsLoading(true);

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
			setIsLoading(false);
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
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}>
				<h3 style={{ textTransform: 'capitalize' }}>
					{collection.name}
				</h3>
				<Button variant='icon' onClick={() => setEditMode(true)}>
					<BiSolidEdit />
				</Button>
			</div>

			<AnimeWrapper isLoading={isLoading} totalDummyItem={5}>
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
							<div
								style={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}>
								<AnimeTitle className='mb-s'>
									{anime.title?.romaji}
								</AnimeTitle>
								<Button
									variant='primary'
									className='mt-auto'
									onClick={() =>
										setSelectedRemoveAnime({
											id: anime.id.toString(),
											name: anime.title?.romaji!,
										})
									}>
									Remove
								</Button>
							</div>
						</Card>
					);
				})}
			</AnimeWrapper>

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
