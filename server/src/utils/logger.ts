import pino from "pino";

const logger = pino({
  prettyPrint: {
    ignore: "hostname",
  },
});

export default logger;
