import { UISchema } from "../../../shared/types";

export interface UIMetadata {
  name: string;
  createdAt?: string;
}

export interface IStorageService {
  save(uiName: string, schema: UISchema): Promise<void>;
  get(uiName: string): Promise<{ schema: UISchema; createdAt?: string } | null>;
  list(): Promise<UIMetadata[]>;
  delete(uiName: string): Promise<void>;
}
