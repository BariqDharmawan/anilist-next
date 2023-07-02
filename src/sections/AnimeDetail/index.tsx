import Button from "@/src/components/Button";
import { useQueryAnimeDetailQuery } from "@/src/graphql/generated";
import Image from "next/image";

interface Props {
  id: string;
}

export default function AnimeDetail({ id }: Props) {
  const { data, loading, error } = useQueryAnimeDetailQuery({
    variables: {
      id: parseInt(id),
      asHtml: true,
    },
  });

  return (
    <div>
      <Button>Add To Collection</Button>
      <h3>{data?.Media?.title?.romaji}</h3>
      <div>
        {data?.Media?.genres?.map((genre, idx) => (
          <p key={idx}>{genre}</p>
        ))}
      </div>
      <div>
        {/* if undefined change placeholder */}
        <Image
          src={data?.Media?.coverImage?.large ?? ""}
          alt="cover anime"
          width={320}
          height={160}
        />
      </div>
      <h4>Rankings</h4>
      {data?.Media?.rankings?.map((ranking) => (
        <div key={ranking?.id}>
          <p>Year: {ranking?.year}</p>
          <p>Rank: {ranking?.rank}</p>
        </div>
      ))}
      {data?.Media?.description && (
        <div>
          <h3>Description</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.Media?.description,
            }}
          />
        </div>
      )}
    </div>
  );
}
