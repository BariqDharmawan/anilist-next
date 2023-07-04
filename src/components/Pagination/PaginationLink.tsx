import { PaginationLinkProps } from '@/src/lib/allInterface';
import Link from 'next/link';
import { PaginationLinkStyle } from './Pagination.styled';

const PaginationLink = ({
	label,
	pageTo,
	isActive = false,
	className = '',
	icon,
}: PaginationLinkProps) => {
	return (
		<PaginationLinkStyle data-active={isActive} className={className}>
			<Link href={`?page=${pageTo}`}>
				{icon && <span className='icon'>{icon}</span>}
				{label}
			</Link>
		</PaginationLinkStyle>
	);
};

export default PaginationLink;
