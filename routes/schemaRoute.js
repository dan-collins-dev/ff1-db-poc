"use strict";
import express from "express";
import { getTables } from "../controllers/schemaController.js";
const schemaRouter = express.Router();

schemaRouter.get("/", (req, res, next) => {
    getTables(
        (data) => {
            res.status(200).json({
                data: data,
            });
        },
        (err) => {
            next(err);
        }
    );
});

export default schemaRouter;
