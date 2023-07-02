import styled from "@emotion/styled";

export const AnimeListContainer = styled.div`
  display: grid;
  max-width: ${(props) => props.theme.breakpoint.l};
  margin: auto;
  padding: 1rem;
`;

export const AnimeListWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
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
  font-size: 1.5rem;
`;
