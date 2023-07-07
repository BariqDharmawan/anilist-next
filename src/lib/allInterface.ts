import { ParsedUrlQuery } from 'querystring';

export interface ParamSlug extends ParsedUrlQuery {
	slug: string;
}

export interface ParamPage extends ParsedUrlQuery {
	page?: string;
}

export interface PaginationLinkProps {
	pageTo: number;
	isActive?: boolean;
	label?: string | number;
	className?: string;
	icon?: any;
}
