import express from "express";
import { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import '../typeorm'
import { router } from './routes'
import cors from 'cors';
import '../../container'
import { AppError } from "@shared/errors/AppError";
import 'reflect-metadata'

const server = express();
server.use(express.json());


server.use(cors({ origin: true }));
server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(router);

server.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.StatusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Error server ${err.message}`
  })
})

server.listen(3333,() => {
  console.log("Running on port 3333");
})
