import { StyledPagination } from './Pagination.styled';
import Button from '../Button';
import { NextRouter } from 'next/router';
import PaginationLink from './PaginationLink';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const PaginationWrapper = ({
	router,
	availablePages = null,
	page,
	isLoading = false,
}: {
	router: NextRouter;
	availablePages: number[] | null;
	page: number;
	isLoading?: boolean;
}) => {
	return (
		<StyledPagination>
			{page > 1 && (
				<PaginationLink pageTo={page - 1} icon={<BiLeftArrowAlt />} />
			)}

			{availablePages?.map(eachPage => (
				<PaginationLink
					key={`page-${eachPage}`}
					pageTo={eachPage}
					isActive={eachPage === page}
					label={eachPage}
				/>
			))}

			<PaginationLink pageTo={page + 1} icon={<BiRightArrowAlt />} />
		</StyledPagination>
	);
};

export default PaginationWrapper;
