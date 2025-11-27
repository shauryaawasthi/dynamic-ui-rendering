import { Router } from 'express';
import { saveUI, getUI, listUIs, deleteUI } from '../controllers/ui.controller';
import { validate } from '../middleware/validator';
import { saveUIRequestSchema } from '../types/schema';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/', validate(saveUIRequestSchema), asyncHandler(saveUI));

router.get('/', asyncHandler(listUIs));

router.get('/:uiName', asyncHandler(getUI));

router.delete('/:uiName', asyncHandler(deleteUI));

export default router;

