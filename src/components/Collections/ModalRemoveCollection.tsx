import { AnimeCollection } from '@/src/types';
import Modal from '../Modal/Index';
import { CollectionCard } from './Collection.styled';
import Button from '../Button';
import { removeCollection } from '@/src/lib/utils';
import { toast } from 'react-hot-toast';

interface Props {
	collection: AnimeCollection | null;
	setCollections: (collections: AnimeCollection[]) => void;
	handleClose: () => void;
}

export default function ModalRemoveCollection({
	collection,
	setCollections,
	handleClose,
}: Props) {
	if (!collection) {
		return null;
	}

	const handleRemove = () => {
		const currentCollection = removeCollection(collection.id);
		toast.success(`Success remove collection: ${collection.name}`);

		setCollections(currentCollection);
		handleClose();
	};

	return (
		<Modal isShow handleClose={handleClose}>
			<CollectionCard>
				Are you Sure Want To Remove {collection.name}
				<br />
				<Button onClick={handleRemove}>Sure</Button>
				<Button onClick={handleClose}>No</Button>
			</CollectionCard>
		</Modal>
	);
}
