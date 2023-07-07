import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { editCollection } from '@/src/lib/utils';
import Button from '../Button';
import { AnimeCollection } from '@/src/types';
import Modal from '../Modal/Index';
import { CollectionCard } from './Collection.styled';
import { Input } from '../Form/Input.styled';

interface ModalEditCollectionProps {
	collection: AnimeCollection;
	setCollections: (collections: AnimeCollection[]) => void;
	handleClose: () => void;
}

export default function ModalEditCollection({
	collection,
	setCollections,
	handleClose,
}: ModalEditCollectionProps) {
	const [collectionName, setCollectionName] = useState(collection.name);

	const handleCreate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { error, data } = editCollection(collection.id, collectionName);
		if (error) {
			toast.error(error);
			return;
		}

		if (!data) {
			toast.error('Data tidak ditemukan');
			handleClose();
			return;
		}

		toast.success(`Success Edit Collection`);
		setCollections(data);
		handleClose();
	};

	return (
		<Modal isShow={true} handleClose={handleClose}>
			<CollectionCard>
				<h2>Edit Collection</h2>
				<form onSubmit={handleCreate}>
					<Input
						style={{ marginBlock: '1rem' }}
						placeholder='Collection Name'
						onChange={e => setCollectionName(e.target.value)}
						value={collectionName}
					/>
					<Button
						variant='primary'
						disabled={collection.name === collectionName}>
						Edit
					</Button>
				</form>
			</CollectionCard>
		</Modal>
	);
}
