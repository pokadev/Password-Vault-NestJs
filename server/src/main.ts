import { FastifyInstance } from 'fastify';
import createServer from './utils/createServer';
import logger from './utils/logger';

function gracefulShutdown(signal:string, app: FastifyInstance){
  process.on(signal, async () => {
    logger.info(`Received ${signal} signal, shutting down`);
  })
}

async function main(){
const app = createServer()

try{
  const url = await app.listen(4000, '0.0.0.0')
  logger.info(`Server listening on ${url}`)
}
catch(err){
  logger.error(err)
  process.exit(1)
}
}

main()