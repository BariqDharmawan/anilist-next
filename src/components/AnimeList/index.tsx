import type { ComponentProps, PropsWithChildren } from 'react';
import { CoverAnime, StyleAnimeWrapper } from './AnimeList.styled';
import { light } from '@/src/theme';
import SkeletonIcon from '../Skeleton/Icon';
import SkeletonText from '../Skeleton/Text';
import { SkeletonCard, SkeletonCardDesc } from '../Skeleton/Skeleton.styled';
type AnimeWrapperType = PropsWithChildren<ComponentProps<'div'>> & {
	isLoading?: boolean;
	totalDummyItem?: number;
};

const AnimeWrapper = ({
	children,
	isLoading,
	totalDummyItem,
}: AnimeWrapperType) => {
	return (
		<StyleAnimeWrapper>
			{isLoading ? (
				<>
					{Array.from(Array(totalDummyItem).keys()).map(
						(_, index) => (
							<SkeletonCard key={`anime ${index}`}>
								<CoverAnime
									style={{
										backgroundColor: light.color.gray300,
									}}
								/>
								<SkeletonCardDesc>
									<SkeletonIcon />
									<SkeletonText />
								</SkeletonCardDesc>
							</SkeletonCard>
						)
					)}
				</>
			) : (
				children
			)}
		</StyleAnimeWrapper>
	);
};

export default AnimeWrapper;
