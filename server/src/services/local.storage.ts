import fs from 'fs/promises';
import path from 'path';
import { IStorageService, UIMetadata } from './storage.service';
import { UISchema } from '../../../shared/types';

export class LocalStorageService implements IStorageService {
  private storageDir: string;

  constructor() {
    this.storageDir = path.join(__dirname, '../../storage');
    this.ensureStorageDir();
  }

  private async ensureStorageDir(): Promise<void> {
    try {
      await fs.access(this.storageDir);
    } catch {
      await fs.mkdir(this.storageDir, { recursive: true });
    }
  }

  private getFilePath(uiName: string): string {
    return path.join(this.storageDir, `${uiName}.json`);
  }

  async save(uiName: string, schema: UISchema): Promise<void> {
    await this.ensureStorageDir();
    const filePath = this.getFilePath(uiName);
    const data = {
      schema,
      createdAt: new Date().toISOString(),
    };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async get(uiName: string): Promise<{ schema: UISchema; createdAt?: string } | null> {
    try {
      const filePath = this.getFilePath(uiName);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);
      return {
        schema: data.schema,
        createdAt: data.createdAt,
      };
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async list(): Promise<UIMetadata[]> {
    await this.ensureStorageDir();
    try {
      const files = await fs.readdir(this.storageDir);
      const jsonFiles = files.filter(f => f.endsWith('.json'));
      
      const metadata = await Promise.all(
        jsonFiles.map(async (file) => {
          const name = file.replace('.json', '');
          const filePath = this.getFilePath(name);
          try {
            const content = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(content);
            return {
              name,
              createdAt: data.createdAt,
            };
          } catch {
            return { name };
          }
        })
      );

      return metadata.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
    } catch (error) {
      return [];
    }
  }

  async delete(uiName: string): Promise<void> {
    const filePath = this.getFilePath(uiName);
    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new Error('UI not found');
      }
      throw error;
    }
  }
}

