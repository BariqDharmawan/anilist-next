import { useState } from 'react';
import { getAnimeCollection } from '@/src/lib/utils';
import Link from 'next/link';
import ClientOnly from '@/src/components/ClientOnly';

export default function CollectionList() {
	const [collections, setCollections] = useState(getAnimeCollection());

	return (
		<ClientOnly>
			{collections.map(collection => (
				<Link href={`/collection/${collection.id}`} key={collection.id}>
					<div>
						<p>{collection.name}</p>
						<p>Contains {collection.list.length} anime</p>
					</div>
				</Link>
			))}
		</ClientOnly>
	);
}
