import { ParamSlug } from '@/src/lib/allInterface';
import AnimeDetail from '@/src/sections/AnimeDetail';
import { useRouter } from 'next/router';

export default function Detail() {
	const router = useRouter();
	const params = router.query as ParamSlug;

	return <AnimeDetail id={params.slug} />;
}
