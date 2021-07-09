import { createConnection } from "typeorm";
import "reflect-metadata";


createConnection().then(() => console.log ("Conectado com o banco de dados"));
