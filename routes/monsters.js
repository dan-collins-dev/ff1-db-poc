"use strict";
import express from "express";
import {
    getAllMonsters,
    getMonsterById,
} from "../controllers/monsterController.js";
const monsterRouter = express.Router();

monsterRouter.get("/", (req, res, next) => {
    if (parseInt(req.query.id)) {
        getMonsterById(
            req.query.id,
            (data) => {
                res.status(200).json({
                    data: data,
                });
            },
            (err) => {
                next(err);
            }
        );
    } else {
        getAllMonsters(
            (data) => {
                res.status(200).json({
                    data: data,
                });
            },
            (err) => {
                next(err);
            }
        );
    }
});

export default monsterRouter;
