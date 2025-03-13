const express = require("express");
const morgan = require("morgan");

const { database } = require("./database");
const { carSchema, carSchemaPartial } = require("./schemas/car");
const { validationMiddleware } = require("./middlewares/validateRequest");
const { config } = require("./config");

const app = express();
app.use(morgan(config.logs.format));
app.use(express.json());

app.get("/cars", (req, res) => {
    res.send(database.getAll());
});
app.get("/cars/:carId", (req, res) => {
    const { params } = req;
    const result = database.getOne(params.carId);
    if(!result) {
        res.status(404).send({
            message: "Resource not found",
        });
        return;
    }
    res.send(database.getOne(params.carId));
});
app.post("/cars", validationMiddleware(carSchema), (req, res) => {
    const { body } = req;
    const id = database.create(body);
    res.status(201).send({
        message: "created successfully",
        id: id,
    });
});
app.put("/cars/:carId", (req, res) => {
    const { body, params } = req;
    const result = database.update(params.carId, body);
    if (result?.error) {
        res.status(404).send({
            message: result.error,
        });
        return;
    }

    res.status(200).send({
        message: "resource replaced successfully",
        id: params.carId,
    });
});
app.patch("/cars/:carId", validationMiddleware(carSchemaPartial), (req, res) => {
    const { body, params } = req;
    const result = database.partialUpdate(params.carId, body);
    if (result?.error) {
        res.status(404).send({
            message: result.error,
        });
        return;
    }
    res.status(200).send({
        message: "resource updated successfully",
        id: params.carId,
    });
});
app.delete("/cars/:carId", (req, res) => {
    const { params } = req;
    const result = database.delete(params.carId);
    if (result?.error) {
        res.status(404).send({
            message: result.error,
        });
        return;
    }
    res.status(200).send({
        message: "deleted successfully",
        id: params.carId,
    });
});

// 🔹 Capture the HTTP server instance
const server = app.listen(config.server.port, async () => {
    await database.initDatabase();
    console.log(`💻 Server initialized on PORT : ${config.server.port}`);
});

module.exports = { app, server };
