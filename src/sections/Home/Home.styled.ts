import { mediaQuerys } from "@/src/theme";
import styled from "@emotion/styled";
import {} from "@emotion/react";

export const AnimeListContainer = styled.div`
  display: grid;
  max-width: ${(props) => props.theme.breakpoint.l};
  margin: auto;
  padding: 1rem;
`;

export const AnimeListWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

export const CoverAnime = styled.div`
  position: relative;
  width: 100%;
  height: 264px;
  background-color: green;
  border-radius: 4px;
`;

export const StyledPagination = styled.div`
  display: flex;
  gap: 1rem;
  margin: auto;
  align-items: center;
`;

export const PaginationPage = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const AnimeTitle = styled.h2`
  font-weight: 500;
  font-size: 0.8rem;
`;
