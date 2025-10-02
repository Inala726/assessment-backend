import { Router } from "express";
import { GetResponseController } from "../controllers/getresponseController";
import { MailchimpController } from "../controllers/mailChimpController";


const router = Router();
const mailchimp = new MailchimpController();
const getresponse = new GetResponseController();

router.post("/mailchimp", mailchimp.integrate.bind(mailchimp));
router.get("/mailchimp/lists", mailchimp.getLists.bind(mailchimp));

router.post("/getresponse", getresponse.integrate.bind(getresponse));
router.get("/getresponse/lists", getresponse.getLists.bind(getresponse));

export default router;
