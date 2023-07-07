import { AnimeListContainer } from '@/src/components/AnimeList/AnimeList.styled';
import ClientOnly from '@/src/components/ClientOnly';
import CollectionList from '@/src/sections/CollectionList';

export default function Collection() {
	return (
		<AnimeListContainer>
			<h1>Collection List</h1>
			<ClientOnly>
				<CollectionList />
			</ClientOnly>
		</AnimeListContainer>
	);
}
