import { AnimeCollection } from '@/src/types';
import Modal from '../Modal/Index';
import { CollectionCard } from './Collection.styled';
import Button from '../Button';
import { removeAnimeFromCollection, removeCollection } from '@/src/lib/utils';
import { toast } from 'react-hot-toast';

export type SelectedAnimeRemove = {
	id: string;
	name: string;
};

interface Props {
	collectionId: string;
	setCollection: (collections: AnimeCollection) => void;
	selectedAnimeRemove: SelectedAnimeRemove;
	handleClose: () => void;
	afterRemove?: () => void;
}

export default function ModalRemoveAnimeCollection({
	collectionId,
	selectedAnimeRemove,
	setCollection,
	afterRemove,
	handleClose,
}: Props) {
	const handleRemove = () => {
		const currentCollection = removeAnimeFromCollection(
			collectionId,
			selectedAnimeRemove.id
		);
		toast.success(`Success remove collection: ${selectedAnimeRemove.name}`);

		console.log(currentCollection);

		setCollection(currentCollection);
		afterRemove && afterRemove;
		handleClose();
	};

	return (
		<Modal isShow handleClose={handleClose}>
			<CollectionCard>
				Are you Sure Want To Remove {selectedAnimeRemove.name}
				<br />
				<Button onClick={handleRemove}>Sure</Button>
				<Button onClick={handleClose}>No</Button>
			</CollectionCard>
		</Modal>
	);
}
