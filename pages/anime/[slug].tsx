import ClientOnly from '@/src/components/ClientOnly'
import AnimeDetail from '@/src/sections/AnimeDetail'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
	slug: string
}

export default function Detail() {
	const router = useRouter()
	const params = router.query as Params

	return <AnimeDetail id={params.slug} />
}
