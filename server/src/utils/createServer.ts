import fastify from 'fastify';
import cors from '@fastify/cors';
import { CORS_ORIGIN } from '../constants';
function createServer () {
  const app = fastify();

  app.register(cors,{
    origin: CORS_ORIGIN,
    credentials: true
  })

  

  return app;
}

export default createServer;