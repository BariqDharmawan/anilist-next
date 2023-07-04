import { ParamSlug } from '@/src/lib/allInterface'
import { useRouter } from 'next/router'
import ClientOnly from '@/src/components/ClientOnly'
import CollectionDetail from '@/src/sections/CollectionDetail'

export default function CollectionDetailPage() {
	const router = useRouter()
	const { slug } = router.query as ParamSlug

	if (!slug) {
		return null
	}

	return (
		<ClientOnly>
			<CollectionDetail {...{ slug }} />
		</ClientOnly>
	)
}
