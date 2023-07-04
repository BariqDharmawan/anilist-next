import useHandleImgError from '@/src/hooks/useHandleImgError';
import Image, { ImageProps } from 'next/image';

interface DefaultImgProp extends Omit<ImageProps, 'src'> {
	src: string | undefined | null;
}

const ImageDefaultError = ({
	src,
	width,
	height,
	alt,
	className = '',
	...props
}: DefaultImgProp) => {
	const { handleImgError, pathImg } = useHandleImgError();

	return width && height ? (
		<Image
			width={width}
			height={height}
			className={className}
			alt={alt}
			src={src ? pathImg(src) : '/images/default.jpg'}
			onError={handleImgError}
			priority
			sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			{...props}
		/>
	) : (
		<Image
			className={className}
			alt={alt}
			src={src ? pathImg(src) : '/images/default.jpg'}
			onError={handleImgError}
			priority
			sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			{...props}
		/>
	);
};

export default ImageDefaultError;
