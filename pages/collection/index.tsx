import { AnimeListContainer } from '@/src/components/AnimeList/AnimeList.styled';
import ClientOnly from '@/src/components/ClientOnly';
import Container from '@/src/components/Container/Index';
import CollectionList from '@/src/sections/CollectionList';

export default function Collection() {
	return (
		<Container>
			<AnimeListContainer>
				<ClientOnly>
					<CollectionList />
				</ClientOnly>
			</AnimeListContainer>
		</Container>
	);
}
