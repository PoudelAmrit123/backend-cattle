import express from "express";
import { getAllCowsAllDetails } from "../controller/allCows.controller.js";
import { getCowsDetails } from "../controller/cows.controller.js";
import { getCowDetails } from "../controller/cow.controller.js";
import { getCowActivityDetailsById } from "../controller/cowActivity.controller.js";
import { getCowActivityDetailsByTimeStamp } from "../controller/getcowActivityByTimestamp.controller.js";
import { getCowsActivityDetails} from "../controller/CowsActivityDetails.controller.js"
import { getReport} from "../controller/report.controller.js"
import { getReportById} from "../controller/reportById.controller.js"

const router = express.Router();

router.get("/cows", getAllCowsAllDetails);
router.get("/cow", getCowsDetails);
router.get("/cow/:id", getCowDetails);

router.get("/cow/activity/:id", getCowActivityDetailsById);
router.get("/cows/activity", getCowsActivityDetails);

router.get("/cow/activity/:id/timestamp", getCowActivityDetailsByTimeStamp);

router.get("/report" , getReport)
router.get("/report/:id/timestamp" , getReportById)

export default router;
