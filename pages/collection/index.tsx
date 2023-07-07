import ClientOnly from '@/src/components/ClientOnly';
import Container from '@/src/components/Container/Index';
import CollectionList from '@/src/sections/CollectionList';

export default function Collection() {
	return (
		<Container className='container'>
			<h1>Collection List</h1>
			<ClientOnly>
				<CollectionList />
			</ClientOnly>
		</Container>
	);
}
