import { GrClose } from "react-icons/gr";
import { AnimeCollection } from "@/src/types";
import { CollectionCard, IconCloseWrapper } from "./Collection.styled";
import Button from "../Button";

interface Props {
  collections: AnimeCollection[] | null;
  handleClose: () => void;
}

export default function CollectionForm({ collections, handleClose }: Props) {
  return (
    <CollectionCard>
      <IconCloseWrapper onClick={handleClose}>
        <GrClose />
      </IconCloseWrapper>
      {collections && collections.length !== 0 ? (
        <AddToCollection {...{ collections }} />
      ) : (
        <CreateCollection />
      )}
    </CollectionCard>
  );
}

function CreateCollection() {
  return <div>Create Collection</div>;
}

function AddToCollection({ collections }: { collections: AnimeCollection[] }) {
  return (
    <div>
      <div>add to collection</div>
      {collections.map((collection) => (
        <div key={collection.name}>{collection.name}</div>
      ))}
    </div>
  );
}
