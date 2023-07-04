/**
 * This type for Collections of Anime .
 * @type {Object}
 * @property {string} name - Collection name must unique.
 */
export type Collection<T extends any[]> = {
	id: string;
	name: string;
	list: T;
};

/**
 * This type for Collections of Anime .
 * @type {Object}
 * @property {string} name - Collection name must unique.
 * @property {Array<string>} list - List contains anime Id
 */
export type AnimeCollection = Collection<string[]>;
