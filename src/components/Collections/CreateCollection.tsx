import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { createNewAnimeCollection } from '@/src/lib/utils';
import Button from '../Button';
import { Input } from '../Form/Input.styled';

interface CreateCollectionProps {
	afterSubmit?: (collectionName: string) => void;
}

export default function CreateCollection({
	afterSubmit,
}: CreateCollectionProps) {
	const [collectionName, setCollectionName] = useState('');

	const handleCreate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errorMsg = createNewAnimeCollection(collectionName!);
		if (errorMsg) {
			toast.error(errorMsg);
			return;
		}

		toast.success(`Success Create New Collection`);
		if (afterSubmit) {
			afterSubmit(collectionName!)!;
		}
	};

	return (
		<div>
			<h2>Create New Collection</h2>
			<form onSubmit={handleCreate}>
				<Input
					style={{ marginBlock: '1rem' }}
					placeholder='Collection Name'
					onChange={e => setCollectionName(e.target.value)}
					value={collectionName}
				/>
				<Button variant='primary'>Create</Button>
			</form>
		</div>
	);
}
