import { COLLECTION_KEY_STORAGE } from '../constants'
import { AnimeCollection } from '../types'
import { v4 as uuidv4 } from 'uuid'

type ErrorMsg = string | null

export const withoutSpecialChar = /^[a-zA-Z0-9.]*$/

export function checkSpecialChar(str: string): boolean {
	return !withoutSpecialChar.test(str)
}

export function deepCopyObject<T extends object>(data: T): T {
	return JSON.parse(JSON.stringify(data))
}

export function setCollectionLocalStorage(
	collections: AnimeCollection[]
): void {
	localStorage.setItem(COLLECTION_KEY_STORAGE, JSON.stringify(collections))
}

export function getAnimeCollection(): AnimeCollection[] {
	const currentCollectionsStr = localStorage.getItem(COLLECTION_KEY_STORAGE)
	if (!currentCollectionsStr) {
		setCollectionLocalStorage([])
		return []
	}
	return JSON.parse(currentCollectionsStr)
}

export function checkCollectionContain(collectionName: string): boolean {
	const collections = getAnimeCollection()

	return collections.some(collection => collection.name === collectionName)
}

export function removeCollection(id: string): AnimeCollection[] {
	const collections = getAnimeCollection()

	const newCollection = collections.filter(collection => {
		return collection.id !== id
	})

	setCollectionLocalStorage(newCollection)
	return newCollection
}

export function createNewAnimeCollection(
	name: string,
	data?: string[]
): ErrorMsg {
	if (!name) {
		return 'Collection name must contain'
	}
	if (checkSpecialChar(name)) {
		return 'Collection name must not contain special characters'
	}

	if (checkCollectionContain(name)) {
		return 'Collection name Already exist'
	}

	const currentCollections = getAnimeCollection()
	const newCollection: AnimeCollection = {
		id: uuidv4(),
		name,
		list: data ?? [],
	}

	if (currentCollections.length === 0) {
		setCollectionLocalStorage([newCollection])
		return null
	}

	setCollectionLocalStorage([...currentCollections, newCollection])
	return null
}
