import { Request, Response } from 'express';
import { IStorageService } from '../services/storage.service';
import { LocalStorageService } from '../services/local.storage';
import { GitHubStorageService } from '../services/github.storage';
import config from '../config/env';
import { AppError } from '../middleware/errorHandler';
import { SaveUIRequest } from '../types/schema';
import { UISchema } from '../../../shared/types';

let storageService: IStorageService;

try {
  if (config.storageMode === 'github') {
    storageService = new GitHubStorageService();
    console.log('Using GitHub storage mode');
  } else {
    storageService = new LocalStorageService();
    console.log('Using local storage mode');
  }
} catch (error) {
  console.error('Failed to initialize storage service:', error);
  console.log('Falling back to local storage mode');
  storageService = new LocalStorageService();
}

export const saveUI = async (req: Request, res: Response) => {
  const { uiName, schema } = req.body as SaveUIRequest;

  await storageService.save(uiName, schema as UISchema);

  res.status(201).json({
    success: true,
    message: 'UI schema saved successfully',
    uiName,
  });
};

export const getUI = async (req: Request, res: Response) => {
  const { uiName } = req.params;

  const result = await storageService.get(uiName);

  if (!result) {
    throw new AppError(404, 'UI not found');
  }

  res.json({
    uiName,
    schema: result.schema,
    createdAt: result.createdAt,
  });
};

export const listUIs = async (_req: Request, res: Response) => {
  const uis = await storageService.list();

  res.json({
    uis,
  });
};

export const deleteUI = async (req: Request, res: Response) => {
  const { uiName } = req.params;

  await storageService.delete(uiName);

  res.json({
    success: true,
    message: 'UI deleted successfully',
  });
};

