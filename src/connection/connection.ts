import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";

const connection = new Sequelize({ 
  database: 'sisweb_db', 
  dialect: 'postgres',
  username: 'sisweb_user', 
  password: 'HDK#$%Ljkwerff.89', 
  storage: ':memory:', 
  models: [
    Product
   ] 
}); 

async function connectionDB() {
  try {
    await connection.authenticate(); // authenticate verifica la conexión
    console.log("Conexión exitosa a la base de datos PostgreSQL.");
    await connection.sync();
  } catch (e) {
    console.log("Error al conectar con la base de datos:", e);
  }
}

export default connectionDB;