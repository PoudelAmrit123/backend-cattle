import express from "express";
import { getAllCowsAllDetails } from "../controller/allCows.controller.js";
import { getCowsDetails } from "../controller/cows.controller.js";
import { getCowDetails } from "../controller/cow.controller.js";
import { getCowActivityDetailsById } from "../controller/cowActivity.controller.js";
import { getCowActivityDetailsByTimeStamp } from "../controller/getcowActivityByTimestamp.controller.js";

const router = express.Router();

router.get("/cows", getAllCowsAllDetails);
router.get("/cow", getCowsDetails);
router.get("/cow/:id", getCowDetails);

router.get("/cow/activity/:id", getCowActivityDetailsById);

router.get("/cow/activity/:id/timestamp", getCowActivityDetailsByTimeStamp);

export default router;
