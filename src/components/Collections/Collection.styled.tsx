import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: ${(props) => props.theme.blur.l};
  background-color: rgba(0, 0, 0, 0.5); /* Warna latar belakang overlay */
  z-index: 9999; /* Pastikan overlay tampil di atas elemen lain */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: backdrop-filter 1s ease-in-out;
`;

export const CollectionCard = styled.div`
  position: relative;
  background-color: white;
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.borderRadius.l};
  max-width: 700px;
  width: 100%;
`;

export const IconCloseWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 16px;
  right: 16px;
  border-radius: 50%;
  transition: background-color 150ms ease-in-out;
  padding: 8px;
  &:hover {
    background-color: rgba(
      170,
      161,
      161,
      0.2
    ); /* Warna latar belakang overlay */
  }
`;
