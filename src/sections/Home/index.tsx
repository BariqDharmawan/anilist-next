import Image from "next/image";
import { useRouter } from "next/router";

import { useQueryMediaPageQuery } from "../../graphql/generated";
import { PropsWithChildren } from "react";

interface Props {
  page: number;
}

export default function Home({ page }: Props) {
  const router = useRouter();
  const { data, loading, error } = useQueryMediaPageQuery({
    variables: {
      page,
      perPage: 10,
    },
  });

  const PaginationWrapper = ({
    isLoading = false,
    children,
  }: PropsWithChildren<{ isLoading?: boolean }>) => {
    return (
      <div>
        <div>
          <button
            disabled={isLoading || page <= 1}
            onClick={() => router.push(`?page=${page - 1}`)}
          >
            prev
          </button>
          <span>{page}</span>
          <button
            disabled={isLoading}
            onClick={() => router.push(`?page=${page + 1}`)}
          >
            next
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (loading) {
    return (
      <PaginationWrapper isLoading>
        <div>loading...</div>
      </PaginationWrapper>
    );
  }

  if (error) {
    console.log(error.message);
    return <div>error</div>;
  }

  if (!data) {
    return <div>data wast exist</div>;
  }

  return (
    <PaginationWrapper>
      <div>
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
      </div>
    </PaginationWrapper>
  );
}
