import { useEffect, useState } from 'react';

const useMatchMedia = () => {
	const [isMoreThanPhone, setIsMoreThanPhone] = useState(false);
	const [isMoreThanTablet, setIsMoreThanTablet] = useState(false);
	const [isMoreThanDesktop, setIsMoreThanDesktop] = useState(false);

	useEffect(() => {
		window.matchMedia('(min-width: 768px)').matches &&
			setIsMoreThanPhone(true);
	}, [isMoreThanPhone]);

	return {
		isMoreThanPhone,
		isMoreThanTablet,
		isMoreThanDesktop,
	};
};

export default useMatchMedia;
