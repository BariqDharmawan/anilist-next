import { useState } from 'react'
import Button from '@/src/components/Button'
import Card from '@/src/components/Card'
import ClientOnly from '@/src/components/ClientOnly'
import CollectionModal from '@/src/components/Collections/CollectionModal'

export default function Explore() {
	const [showModal, setShowModal] = useState(false)

	return (
		<Card>
			<p>
				This is just for example component remove later if you already
				understand emotion
			</p>
			<Button onClick={() => setShowModal(true)}>Show Modal</Button>
			<ClientOnly>
				<CollectionModal
					isShow={showModal}
					setShow={setShowModal}
					animeId='99'
				/>
			</ClientOnly>
		</Card>
	)
}
