import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { CORS_ORIGIN } from "../constants";

function createServer() {
  const app = fastify();

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: {
      private: fs.readFileSync(
        `${path.join(process.cwd(), "certs")}/private.key`
      ),
      public: fs.readFileSync(
        `${path.join(process.cwd(), "certs")}/public.key`
      ),
    },
    sign: { algorithm: "RS256" },
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });

  app.register(cookie, {
    parseOptions: {},
  });

  app.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const user = await request.jwtVerify<{ id: string }>();
        request.user = user;
      } catch (err) {
        return reply.code(401).send({
          message: "Unauthorized",
        });
      }
    }
  );

  return app;
}

export default createServer;
