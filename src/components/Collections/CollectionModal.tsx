import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import CollectionForm from './CollectionForm'
import { ModalOverlay } from './Collection.styled'
import { AnimeCollection } from '@/src/types'
import { COLLECTION_KEY_STORAGE } from '@/src/constants'

interface Props {
	isShow: boolean
	setShow: (show: boolean) => void
	animeId: string
}

export default function CollectionModal({ isShow, setShow, animeId }: Props) {
	const [collections, setCollections] = useState<AnimeCollection[]>([])
	const handleClose = () => {
		setShow(false)
	}

	useEffect(() => {
		const getCollection = () => {
			const currentCollectionStr = localStorage.getItem(
				COLLECTION_KEY_STORAGE
			)
			if (!currentCollectionStr) {
				localStorage.setItem(COLLECTION_KEY_STORAGE, '[]')
				return
			}

			const currentCollection = JSON.parse(
				currentCollectionStr
			) as AnimeCollection[]
			setCollections(currentCollection)
		}

		isShow && (document.body.style.overflow = 'hidden')
		getCollection()
		return () => {
			document.body.style.overflow = ''
		}
	}, [isShow])

	return (
		<>
			{isShow &&
				createPortal(
					<ModalOverlay
						onClick={event => {
							if (event.currentTarget === event.target) {
								setShow(false)
							}
						}}>
						<CollectionForm
							{...{ handleClose, collections, animeId }}
						/>
					</ModalOverlay>,
					document.body
				)}
		</>
	)
}
