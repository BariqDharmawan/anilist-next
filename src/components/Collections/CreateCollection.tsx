import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";
import {
  checkSpecialChar,
  createNewAnimeCollection,
  getAnimeCollection,
} from "@/src/lib/utils";

interface CreateCollectionProps {
  id: string;
  afterSubmit: () => void;
}

export default function CreateCollection({
  id,
  afterSubmit,
}: CreateCollectionProps) {
  const [collectionName, setCollectionName] = useState<string | undefined>();

  const checkCollectionContain = (_collectionName: string) => {
    const collections = getAnimeCollection();

    return collections.some(
      (collection) => collection.name === _collectionName
    );
  };

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!collectionName) {
      toast.error("Collection name must contain");
      return;
    }

    if (checkSpecialChar(collectionName)) {
      toast.error("Collection name must not contain special characters");
      return;
    }

    if (checkCollectionContain(collectionName)) {
      toast.error("Collection name Already exist");
      return;
    }

    createNewAnimeCollection(collectionName, id);
    toast.success(`Success Create New Collection`);
    afterSubmit();
  };

  return (
    <div>
      <h2>Create New Collection</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input
            placeholder="Collection Name"
            onChange={(e) => setCollectionName(e.target.value)}
            value={collectionName}
          />
        </div>
        <br />
        <Button>Create</Button>
      </form>
    </div>
  );
}
