import { ParsedUrlQuery } from 'querystring'

export interface ParamSlug extends ParsedUrlQuery {
	slug: string
}
