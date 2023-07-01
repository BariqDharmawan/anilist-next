import { useQueryMediaPageQuery } from "../graphql/generated";
import Image from "next/image";

export default function Home() {
  const { data, loading, error } = useQueryMediaPageQuery({
    variables: {
      page: 1,
      perPage: 10,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error.message);
    return <div>error</div>;
  }

  if (!data) {
    return <div>data wast exist</div>;
  }

  return (
    <>
      {data.Page?.media?.map((anime) => (
        <div key={anime?.id}>
          <span>{anime?.title?.romaji}</span>
          <Image
            src={anime?.bannerImage ?? ""}
            alt={"anime"}
            width={40}
            height={40}
          />
        </div>
      ))}
    </>
  );
}
