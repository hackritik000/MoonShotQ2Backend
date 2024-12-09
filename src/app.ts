import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Route Import
import userRoute from './routes/user.route.js';
import { ApiError } from './utils/ApiError.js';

// Route Declaration
app.use('/api/v1/users', userRoute);
app.get('/test', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'api is working' });
});

app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ApiError) {
      res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message });
    } else {
      console.error(err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export { app };
