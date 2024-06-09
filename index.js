import express from "express";

import fs from "fs";
import cors from "cors";


const fileContent = fs.readFileSync("canciones.json", "utf8");
const cancionesParse = JSON.parse(fileContent);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    try {
        res.sendFile(__dirname + "/index.html");
        res.status(200);
    } catch (error) {
        res.json({ message: "Recurso no disponible" });
        res.status(404);
    }
});

app.get("/canciones", (req, res) => {
    try {
        cancionesParse;
        res.status(200).json(cancionesParse);
    } catch (error) {
        res.status(500).json({ error: "Error al ingresar la solicitud" });
        console.error("Error al ingresar la solicitud", error);
    }
});

app.post("/canciones", (req, res) => {
    try {
        const cancion = req.body;
        cancionesParse;
        fs.writeFileSync(
            "canciones.json",
            JSON.stringify([...cancionesParse, cancion])
        );
        res.status(200).send("Canción agregada con éxito");
    } catch (error) {
        res.status(500).json({ error: "Error al ingresar la solicitud" });
        console.error("Error al ingresar la solicitud", error);
    }
});

app.put("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const cancion = req.body;
        cancionesParse;
        const index = cancion.findIndex((c) => c.id == id);
        cancionesParse[index] = cancion;
        fs.writeFileSync("canciones.json", JSON.stringify(cancion));
        res.status(201).send("¡Canción agregada con éxito!");
    } catch (error) {
        res.status(500).json({ error: "Error al ingresar la solicitud" });
        console.error("Error al ingresar la solicitud:", error);
    }
});

app.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const index = cancionesParse.findIndex((c) => c.id == id);
        cancionesParse.splice(index, 1);
        fs.writeFileSync("canciones.json", JSON.stringify(cancionesParse));
        res.status(204).send("Canción modificada con éxito");
    } catch (error) {
        res.status(500).json({ error: "Error al ingresar la solicitud" });
        console.error("Error al ingresar la solicitud:", error);
    }
});

app.listen(5000, () => {
    console.log("Servidor encendido");
});