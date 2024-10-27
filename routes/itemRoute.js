"use strict";
import express from "express";
import { getAllItems } from "../controllers/itemController.js"
const itemRouter = express.Router();

itemRouter.get("/", (req, res, next) => {
    getAllItems((data) => {
        res.status(200).json({
            data: data
        })
    }, (err) => {next(err)})
})

export default itemRouter;
