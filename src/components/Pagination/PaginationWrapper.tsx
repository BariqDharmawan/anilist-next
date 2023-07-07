import { StyledPagination } from './Pagination.styled';
import PaginationLink from './PaginationLink';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface Props {
	page: number;
	availablePages: number[] | null;
}

const PaginationWrapper = ({ availablePages = null, page }: Props) => {
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
