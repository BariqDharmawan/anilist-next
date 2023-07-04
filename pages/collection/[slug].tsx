import { ParamSlug } from '@/src/lib/allInterface';
import { useRouter } from 'next/router';

export default function CollectionDetail() {
	const router = useRouter();
	const { slug } = router.query as ParamSlug;

	return <div>Collection Detail id: {slug}</div>;
}
