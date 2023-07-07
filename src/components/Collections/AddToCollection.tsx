import toast from 'react-hot-toast';
import { deepCopyObject, setCollectionLocalStorage } from '@/src/lib/utils';
import { AnimeCollection } from '@/src/types';

interface AddToCollectionProps {
	collections: AnimeCollection[];
	afterSubmit?: () => void;
	listAnime: string[];
}

export default function AddToCollection({
	collections,
	afterSubmit,
	listAnime,
}: AddToCollectionProps) {
	const handleAddCollection = (collectionName: string, data: string[]) => {
		const copyCollections = deepCopyObject(collections);

		const indexSelectCollection = copyCollections.findIndex(collection => {
			return collection.name === collectionName;
		});

		data.forEach(eachData =>
			copyCollections[indexSelectCollection].list.push(eachData)
		);

		setCollectionLocalStorage(copyCollections);
		toast.success('Success Add Anime to Collection');
		afterSubmit && afterSubmit();
	};

	return (
		<div>
			<div>Add to collection</div>
			<br />
			{collections.map(collection => (
				<div
					key={collection.name}
					onClick={() =>
						handleAddCollection(collection.name, listAnime)
					}>
					{collection.name}
				</div>
			))}
		</div>
	);
}
