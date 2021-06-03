import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import cors from 'cors';
import connectStore from "connect-mongo";
import { userRoutes, sessionRoutes, nutritionRoutes, donationRoutes } from './routes/index'; 
import {
  PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME
} from "./config";

(async () => {
  try {
    // Connect to MongoDB database
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB connected');

    // Create Express app
    const app = express();

    app.disable('x-powered-by');

    // Enable CORS
    app.use(cors());

    // Express middleware to parse json and urlencoded
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Configure connection
    const MongoStore = connectStore(session);

    // Create session 
    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000,
      }),
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
      }
    }));

    // Express Router middleware
    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/session', sessionRoutes);
    apiRouter.use('/nutrition', nutritionRoutes);
    apiRouter.use('/donation', donationRoutes);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})(); 