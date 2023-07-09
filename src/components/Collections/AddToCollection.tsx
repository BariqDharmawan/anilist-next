import toast from 'react-hot-toast';
import {
	addToCollection,
	deepCopyObject,
	setCollectionLocalStorage,
} from '@/src/lib/utils';
import { AnimeCollection } from '@/src/types';
import {
	CollectionSelectedList,
	CollectionSelectedName,
} from './Collection.styled';
import { light } from '@/src/theme';

interface AddToCollectionProps {
	collections: AnimeCollection[];
	afterSubmit?: () => void;
	handleClose?: () => void;
	listAnime: string[];
}

export default function AddToCollection({
	collections,
	afterSubmit,
	listAnime,
}: AddToCollectionProps) {
	const handleAddCollection = (collectionName: string, data: string[]) => {
		const error = addToCollection(collectionName, data);

		if (error) {
			toast.error(
				<div dangerouslySetInnerHTML={{ __html: error }}></div>
			);
			return;
		}

		toast.success('Success Add Anime to Collection');
		afterSubmit && afterSubmit();
	};

	return (
		<CollectionSelectedList>
			{collections.map(collection => (
				<CollectionSelectedName
					key={collection.name}
					onClick={() =>
						handleAddCollection(collection.name, listAnime)
					}>
					{collection.name}
				</CollectionSelectedName>
			))}
		</CollectionSelectedList>
	);
}
