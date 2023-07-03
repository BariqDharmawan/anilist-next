import { COLLECTION_KEY_STORAGE } from '../constants'
import { AnimeCollection } from '../types'

const getCollection = () => {
	const currentCollectionStr = localStorage.getItem(COLLECTION_KEY_STORAGE)
	if (!currentCollectionStr) {
		localStorage.setItem(COLLECTION_KEY_STORAGE, '[]')
		return []
	}

	const currentCollection = JSON.parse(
		currentCollectionStr
	) as AnimeCollection[]

	return currentCollection
}

export default getCollection
