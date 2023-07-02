import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function CollectionDetail() {
  const router = useRouter();
  const { slug } = router.query as Params;

  return <div>Collection Detail id: {slug}</div>;
}
