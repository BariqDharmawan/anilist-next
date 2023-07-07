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
			toast.error(error);
			return;
		}

		toast.success('Success Add Anime to Collection');
		afterSubmit && afterSubmit();
	};

	return (
		<div>
			<div>Add to collection</div>
			<br />
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
		</div>
	);
}
