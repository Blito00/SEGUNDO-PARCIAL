import express from "express";
import mysql from "mysql2";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.get("/check-mariadb-connection", (req, res) => {

    const connection = mysql.createConnection({
        host: "mariadb",
        user: "root",
        password: "root",
        port: 3306,
        database: "test",
    });
    connection.connect((error) => {
        if (error) {
            console.error("Error al conectarse a la base de datos:", error);
            res.status(500)
            res.json({ error: "Error al conectarse a MariaDB" });
        } else {
            res.json({ msg: "Se conecto a MariaDB" });
        }
    });
});

app.get("/check-mongodb-connection", (req, res) => {
    const url = "mongodb://mongodb:27017/test";
    mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Conexión exitosa a MongoDB");
            res.json({ msg: "Conexión exitosa a la base de datos de MongoDB" });
        })
        .catch((err) => {
            console.error("Error al conectarse a MongoDB:", err);
            res
                .status(500)
                .json({ error: "Error al conectarse MongoDB" });
        });
});

app.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
});
