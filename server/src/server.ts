import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import config from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/v1', routes);

// Serve static files from React app in production only added as an optimisation 
// only added this to explain and production use case
if (config.nodeEnv === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  // Handle React routing, return all requests to React app
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// health-check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', storageMode: config.storageMode });
});

// it must be last 
app.use(errorHandler);

// start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log('Server started successfully!');
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Storage Mode: ${config.storageMode}`);
  if (config.nodeEnv === 'development') {
    console.log(`CORS Origin: ${config.corsOrigin}`);
  }
  console.log('');
});

