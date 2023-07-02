import { createPortal } from "react-dom";
import CollectionForm from "./CollectionForm";
import { ModalOverlay } from "./Collection.styled";
import { useEffect, useState } from "react";
import { AnimeCollection } from "@/src/types";

interface Props {
  isShow: boolean;
  setShow: (show: boolean) => void;
}

export default function CollectionModal({ isShow, setShow }: Props) {
  const [collections, setCollections] = useState<AnimeCollection[]>([]);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const getCollection = () => {
      const currentCollectionStr = localStorage.getItem("collection");
      if (!currentCollectionStr) {
        localStorage.setItem("collection", "[]");
        return;
      }

      const currentCollection = JSON.parse(
        currentCollectionStr
      ) as AnimeCollection[];
      setCollections(currentCollection);
    };

    document.body.style.overflow = "hidden";
    getCollection();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {isShow &&
        createPortal(
          <ModalOverlay
            onClick={(event) => {
              if (event.currentTarget === event.target) {
                setShow(false);
              }
            }}
          >
            <CollectionForm {...{ handleClose, collections }} />
          </ModalOverlay>,
          document.body
        )}
    </>
  );
}
