import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalOverlay } from '../Collections/Collection.styled'

interface Props {
	isShow: boolean
	handleClose: () => void
}

export default function Modal({
	isShow,
	handleClose,
	children,
}: PropsWithChildren<Props>) {
	useEffect(() => {
		isShow && (document.body.style.overflow = 'hidden')

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
								handleClose()
							}
						}}>
						{children}
					</ModalOverlay>,
					document.body
				)}
		</>
	)
}
