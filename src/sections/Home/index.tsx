import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

import { useQueryMediaPageQuery } from "../../graphql/generated";
import {
  AnimeListContainer,
  AnimeListWrapper,
  StyledPagination,
  PaginationPage,
  AnimeTitle,
} from "./Home.styled";

import Card from "@/src/components/Card";
import Button from "@/src/components/Button";

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
      <AnimeListContainer>
        <StyledPagination>
          <Button
            disabled={isLoading || page <= 1}
            onClick={() => router.push(`?page=${page - 1}`)}
          >
            prev
          </Button>
          <PaginationPage>{page}</PaginationPage>
          <Button
            disabled={isLoading}
            onClick={() => router.push(`?page=${page + 1}`)}
          >
            next
          </Button>
        </StyledPagination>
        {children}
      </AnimeListContainer>
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
      <AnimeListWrapper>
        {data.Page?.media?.map((anime) => (
          <Link href={`/anime/${anime?.id}`} key={anime?.id}>
            <Card>
              <AnimeTitle>{anime?.title?.romaji}</AnimeTitle>
              <Image
                src={anime?.bannerImage ?? ""}
                alt={"anime"}
                width={40}
                height={40}
              />
            </Card>
          </Link>
        ))}
      </AnimeListWrapper>
    </PaginationWrapper>
  );
}
