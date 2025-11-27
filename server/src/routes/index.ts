import { Router } from 'express';
import uiRoutes from './ui.routes';

const router = Router();

router.use('/ui', uiRoutes);

export default router;

