import { useState } from 'react';

const useHandleModal = () => {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};

	return {
		setShowModal,
		showModal,
		handleClose,
	};
};

export default useHandleModal;
