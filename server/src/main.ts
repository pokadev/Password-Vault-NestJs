import { FastifyInstance } from "fastify";
import { connect } from 'mongoose';
import createServer from "./utils/createServer";
import { connectToDb, disconnectFromDb } from "./utils/db";
import logger from "./utils/logger";

function gracefulShutdown(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    logger.info(`Received ${signal} signal, shutting down`);

    await connectToDb()

    app.close();

    await disconnectFromDb();
    logger.info("Disconnected from DB");

    process.exit(0);
  });
}

async function main() {
  const app = createServer();

  try {
    const url = await app.listen(4000, "0.0.0.0");
    logger.info(`Server listening on ${url}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  const signals = ["SIGTERM", "SIGINT"];

  for(let i=0; i<signals.length; i++){
    gracefulShutdown(signals[i], app);
  }
}

main();
