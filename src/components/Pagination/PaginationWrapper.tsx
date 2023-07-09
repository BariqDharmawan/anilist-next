import { light } from '@/src/theme';
import { StyledPagination } from './Pagination.styled';
import PaginationLink from './PaginationLink';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { SkeletonCircle } from '../Skeleton/Skeleton.styled';

interface Props {
	page: number;
	availablePages: number[];
	isLoading: boolean;
}

const PaginationWrapper = ({
	availablePages,
	page,
	isLoading = false,
}: Props) => {
	return (
		<StyledPagination>
			{!isLoading && page > 1 && (
				<PaginationLink pageTo={page - 1} icon={<BiLeftArrowAlt />} />
			)}

			{!isLoading ? (
				availablePages.map(eachPage => (
					<PaginationLink
						key={`page-${eachPage}`}
						pageTo={eachPage}
						isActive={eachPage === page}
						label={eachPage}
					/>
				))
			) : (
				<>
					<SkeletonCircle size='20px' />
					<SkeletonCircle size='20px' />
					<SkeletonCircle size='20px' />
				</>
			)}

			{!isLoading && (
				<PaginationLink pageTo={page + 1} icon={<BiRightArrowAlt />} />
			)}
		</StyledPagination>
	);
};

export default PaginationWrapper;
