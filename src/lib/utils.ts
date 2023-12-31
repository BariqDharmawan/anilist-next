import { COLLECTION_KEY_STORAGE } from '../constants';
import { AnimeCollection } from '../types';
import { v4 as uuidv4 } from 'uuid';

type ErrorMsg = string | null;

export const withoutSpecialChar = /^[a-zA-Z0-9.]*$/;

export function checkSpecialChar(str: string): boolean {
	return !withoutSpecialChar.test(str);
}

export function deepCopyObject<T extends object>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

export function setCollectionLocalStorage(
	collections: AnimeCollection[]
): void {
	localStorage.setItem(COLLECTION_KEY_STORAGE, JSON.stringify(collections));
}

export function getAnimeCollection(): AnimeCollection[] {
	const currentCollectionsStr = localStorage.getItem(COLLECTION_KEY_STORAGE);
	if (!currentCollectionsStr) {
		setCollectionLocalStorage([]);
		return [];
	}
	return JSON.parse(currentCollectionsStr);
}

export function checkCollectionContain(collectionName: string): boolean {
	const collections = getAnimeCollection();

	return collections.some(collection => collection.name === collectionName);
}

interface ReturnEditCollection {
	data: AnimeCollection[] | null;
	error: ErrorMsg;
}

export function editCollection(
	id: string,
	newName: string
): ReturnEditCollection {
	if (!newName) {
		return {
			data: null,
			error: 'Collection name must contain',
		};
	}
	if (checkSpecialChar(newName)) {
		return {
			data: null,
			error: 'Collection name must not contain special characters',
		};
	}

	if (checkCollectionContain(newName)) {
		return {
			data: null,
			error: 'Collection name Already exist',
		};
	}
	const collections = getAnimeCollection();
	const editedIdx = collections.findIndex(collections => {
		return collections.id === id;
	});

	collections[editedIdx].name = newName;
	setCollectionLocalStorage(collections);

	return {
		data: collections,
		error: null,
	};
}

export function removeCollection(id: string): AnimeCollection[] {
	const collections = getAnimeCollection();

	const newCollection = collections.filter(collection => {
		return collection.id !== id;
	});

	setCollectionLocalStorage(newCollection);
	return newCollection;
}

type ReturnAddToCollection = {
	error: ErrorMsg;
	collection: AnimeCollection;
};

export function addToCollection(
	collectionName: string,
	data: string[]
): ErrorMsg {
	const collections = getAnimeCollection();

	const indexSelectCollection = collections.findIndex(collection => {
		return collection.name === collectionName;
	});

	for (let i = 0; i < data.length; i++) {
		if (collections[indexSelectCollection].list.includes(data[i])) {
			return `Anime ${data[i]} already in collection <b>${collectionName}</b>`;
		}
	}

	collections[indexSelectCollection].list = [
		...collections[indexSelectCollection].list,
		...data,
	];

	setCollectionLocalStorage(collections);
	return null;
}

export function checkMediaIdHasContain(
	collectionId: string,
	animeId: string
): boolean {
	const collections = getAnimeCollection();

	const selectedCollectionIdx = collections.findIndex(collection => {
		return collection.id === collectionId;
	});

	return collections[selectedCollectionIdx].list.some(id => id === animeId);
}

export function removeAnimeFromCollection(
	collectionId: string,
	animeId: string
): AnimeCollection {
	const collections = getAnimeCollection();

	const selectedCollectionIdx = collections.findIndex(collection => {
		return collection.id === collectionId;
	});

	collections[selectedCollectionIdx].list = collections[
		selectedCollectionIdx
	].list.filter(id => {
		return id !== animeId;
	});

	setCollectionLocalStorage(collections);
	return collections[selectedCollectionIdx];
}

export function createNewAnimeCollection(
	name: string,
	data?: string[]
): ErrorMsg {
	if (!name) {
		return 'Collection name must contain';
	}
	if (checkSpecialChar(name)) {
		return 'Collection name must not contain special characters';
	}

	if (checkCollectionContain(name)) {
		return 'Collection name Already exist';
	}

	const currentCollections = getAnimeCollection();
	const newCollection: AnimeCollection = {
		id: uuidv4(),
		name,
		list: data ?? [],
	};

	if (currentCollections.length === 0) {
		setCollectionLocalStorage([newCollection]);
		return null;
	}

	setCollectionLocalStorage([...currentCollections, newCollection]);
	return null;
}

export const removeElFromArr = ({
	arr,
	elToRemove,
}: {
	arr: string[];
	elToRemove: string;
}) => {
	return arr.filter(eachEl => elToRemove !== eachEl);
};
