import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../constants';
import logger from './logger';

export async function connectToDb(){
  try{
    await mongoose.connect(DB_CONNECTION_STRING)
  }
  catch(err){
    logger.error(err, "Failed to connect to DB");
    process.exit(1);
  }
}

export async function disconnectFromDb(){
  await mongoose.disconnect();
  logger.info("Disconnected from DB");
  return;
}