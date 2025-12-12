import Dexie, { type Table } from "dexie";

export interface AvatarRecord {
  key: "user-avatar"; // Фиксированный ключ
  blob: File;
  createdAt: Date;
}

export interface ImageRecord {
  id?: number; // автоинкремент
  blob: File;
  createdAt: Date;
}

class AppDatabase extends Dexie {
  public avatars!: Table<AvatarRecord>;
  public images!: Table<ImageRecord>;

  constructor() {
    super("MyAppStorage");
    this.version(1).stores({
      avatars: "key",
      images: "++id, createdAt",
    });
  }
}

export const db = new AppDatabase();
