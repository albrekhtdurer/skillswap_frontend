import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export function useImages() {
  const images = useLiveQuery<File[]>(() => {
    return db.images
      .orderBy("createdAt")
      .toArray()
      .then((arr) => arr.map((r) => r.blob));
  }, []);

  const addImages = async (files: File[]) => {
    const records = files.map((file) => ({
      blob: file,
      createdAt: new Date(),
    }));
    await db.images.bulkAdd(records);
  };

  const removeImage = async (fileToRemove: File) => {
    const records = await db.images.toArray();
    const record = records.find(
      (r) =>
        r.blob.name === fileToRemove.name &&
        r.blob.size === fileToRemove.size &&
        r.blob.lastModified === fileToRemove.lastModified,
    );
    if (record?.id) {
      await db.images.delete(record.id);
    }
  };

  return {
    images: images ?? [],
    addImages,
    removeImage,
  };
}
