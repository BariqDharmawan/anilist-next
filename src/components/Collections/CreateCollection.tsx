import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button'
import {
	checkSpecialChar,
	createNewAnimeCollection,
	getAnimeCollection,
} from '@/src/lib/utils'

interface CreateCollectionProps {
	afterSubmit?: (collectionName: string) => void
}

export default function CreateCollection({
	afterSubmit,
}: CreateCollectionProps) {
	const [collectionName, setCollectionName] = useState('')

	const handleCreate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const errorMsg = createNewAnimeCollection(collectionName!)
		if (errorMsg) {
			toast.error(errorMsg)
			return
		}

		toast.success(`Success Create New Collection`)
		if (afterSubmit) {
			afterSubmit(collectionName!)!
		}
	}

	return (
		<div>
			<h2>Create New Collection</h2>
			<form onSubmit={handleCreate}>
				<div>
					<input
						placeholder='Collection Name'
						onChange={e => setCollectionName(e.target.value)}
						value={collectionName}
					/>
				</div>
				<br />
				<Button>Create</Button>
			</form>
		</div>
	)
}
