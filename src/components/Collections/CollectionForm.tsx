import { GrClose } from 'react-icons/gr';
import { AnimeCollection } from '@/src/types';
import {
	ButtonActionWrapper,
	CollectionCard,
	IconCloseWrapper,
} from './Collection.styled';
import CreateCollection from './CreateCollection';

import AddToCollection from './AddToCollection';
import { useState } from 'react';
import { TabsContainer } from '../Tabs/Tabs.styled';
import TabsItem from '../Tabs/TabsItem';
import Tabs from '../Tabs/Index';
import Button from '../Button';

type ActionCollectionTab = 'add' | 'create';

interface Props {
	collections: AnimeCollection[] | null;
	handleClose: () => void;
	listAnime?: string[];
	afterCreate?: (collectionName: string) => void;
	tabs?: true;
	initTab?: ActionCollectionTab;
}

export default function CollectionForm({
	collections,
	handleClose,
	afterCreate,
	listAnime = [],
	tabs,
	initTab,
}: Props) {
	const [activeTab, setActiveTab] = useState<ActionCollectionTab>(
		initTab ?? 'add'
	);

	return (
		<CollectionCard>
			<IconCloseWrapper onClick={handleClose}>
				<GrClose />
			</IconCloseWrapper>
			{tabs && (
				<>
					<Tabs style={{ marginBottom: '12px' }}>
						<TabsItem
							className={activeTab === 'add' ? 'active' : ''}
							onClick={() => setActiveTab('add')}>
							Choose Collection
						</TabsItem>
						<TabsItem
							className={activeTab === 'create' ? 'active' : ''}
							onClick={() => setActiveTab('create')}>
							Create New Collection
						</TabsItem>
					</Tabs>
				</>
			)}
			{collections && collections.length !== 0 && activeTab === 'add' ? (
				<AddToCollection
					{...{ collections, listAnime, afterSubmit: handleClose }}
				/>
			) : (
				<CreateCollection afterSubmit={afterCreate} />
			)}
		</CollectionCard>
	);
}
