import { GrClose } from 'react-icons/gr'
import { AnimeCollection } from '@/src/types'
import { CollectionCard, IconCloseWrapper } from './Collection.styled'
import CreateCollection from './CreateCollection'

import AddToCollection from './AddToCollection'
import { useState } from 'react'
import { createNewAnimeCollection } from '@/src/lib/utils'
import Button from '../Button'

type ActionCollectionTab = 'add' | 'create'

interface Props {
	collections: AnimeCollection[] | null
	handleClose: () => void
	animeId?: string
	afterCreate?: (collectionName: string) => void
	tabs?: true
	initTab?: ActionCollectionTab
}

export default function CollectionForm({
	collections,
	handleClose,
	afterCreate,
	animeId = '',
	tabs,
	initTab,
}: Props) {
	const [activeTab, setActiveTab] = useState<ActionCollectionTab>(
		initTab ?? 'add'
	)

	return (
		<CollectionCard>
			<IconCloseWrapper onClick={handleClose}>
				<GrClose />
			</IconCloseWrapper>
			{tabs && (
				<>
					<Button onClick={() => setActiveTab('add')}>Add</Button>
					<Button onClick={() => setActiveTab('create')}>
						Create
					</Button>
				</>
			)}
			{collections && collections.length !== 0 && activeTab === 'add' ? (
				<AddToCollection
					{...{ collections, animeId, afterSubmit: handleClose }}
				/>
			) : (
				<CreateCollection afterSubmit={afterCreate} />
			)}
		</CollectionCard>
	)
}
