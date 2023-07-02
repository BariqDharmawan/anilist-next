import { GrClose } from "react-icons/gr";
import { AnimeCollection } from "@/src/types";
import { CollectionCard, IconCloseWrapper } from "./Collection.styled";
import CreateCollection from "./CreateCollection";

import AddToCollection from "./AddToCollection";

interface Props {
  collections: AnimeCollection[] | null;
  handleClose: () => void;
  animeId: string;
}

export default function CollectionForm({
  collections,
  handleClose,
  animeId,
}: Props) {
  return (
    <CollectionCard>
      <IconCloseWrapper onClick={handleClose}>
        <GrClose />
      </IconCloseWrapper>
      {collections && collections.length !== 0 ? (
        <AddToCollection
          afterSubmit={handleClose}
          {...{ collections, animeId }}
        />
      ) : (
        <CreateCollection afterSubmit={handleClose} id={animeId} />
      )}
    </CollectionCard>
  );
}
