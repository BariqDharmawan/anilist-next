import toast from 'react-hot-toast'
import { deepCopyObject, setCollectionLocalStorage } from '@/src/lib/utils'
import { AnimeCollection } from '@/src/types'

interface AddToCollectionProps {
	collections: AnimeCollection[]
	afterSubmit?: () => void
	animeId: string
}

export default function AddToCollection({
	collections,
	afterSubmit,
	animeId,
}: AddToCollectionProps) {
	const handleAddCollection = (collectionName: string, data: string) => {
		const copyCollections = deepCopyObject(collections)

		const indexSelectCollection = copyCollections.findIndex(collection => {
			return collection.name === collectionName
		})

		copyCollections[indexSelectCollection].list.push(data)
		setCollectionLocalStorage(copyCollections)
		toast.success('Success Add Anime to Collection')
		afterSubmit && afterSubmit()
	}

	return (
		<div>
			<div>Add to collection</div>
			<br />
			{collections.map(collection => (
				<div
					key={collection.name}
					onClick={() =>
						handleAddCollection(collection.name, animeId)
					}>
					{collection.name}
				</div>
			))}
		</div>
	)
}
