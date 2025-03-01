import express from "express";
import { getAllCowsAllDetails } from "../controller/getAllCowsAllDetails.js";
import { getCowsDetails } from "../controller/getCowsDetails.js";
import { getCowDetails } from "../controller/getCowDetails.js";
import { getCowActivityDetailsById } from "../controller/getCowActivityDetailsById.js";
import { getCowActivityDetailsByTimeStamp } from "../controller/getCowActivityDetailsByTimeStamp.js";
import { getCowsActivityDetails} from "../controller/getCowsActivityDetails.js"
import { getReport} from "../controller/report.controller.js"
import { getReportById} from "../controller/reportById.controller.js"
import { loginController } from "../controller/login.controller.js"
import { signupController } from "../controller/signup.controller.js"


const router = express.Router();

router.post('/login' ,  loginController)
router.post('/signup' ,  signupController)

router.get("/cows", getAllCowsAllDetails);
router.get("/cow", getCowsDetails);
router.get("/cow/:id", getCowDetails);

router.get("/cow/activity/:id", getCowActivityDetailsById);
router.get("/cows/activity", getCowsActivityDetails);

router.get("/cow/activity/:id/timestamp", getCowActivityDetailsByTimeStamp);

router.get("/report" , getReport)
router.get("/report/:id/timestamp" , getReportById)

export default router;
