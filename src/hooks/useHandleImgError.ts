import { useState } from 'react';

const useHandleImgError = (imgOnError = '/images/default.jpg') => {
	const [imgError, setImgError] = useState(false);

	const handleImgError = () => {
		setImgError(true);
	};

	const pathImg = (imgOnSuccess: string | undefined) =>
		imgError
			? imgOnError
			: imgOnSuccess === undefined
			? '/images/no-img.jpg'
			: imgOnSuccess;

	return { imgError, handleImgError, pathImg };
};

export default useHandleImgError;
