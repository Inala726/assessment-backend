import { Router } from "express";
import { MailchimpController } from "../controllers/mailChimpController";

const router = Router();
const controller = new MailchimpController();

router.post("/mailchimp", controller.integrate.bind(controller));
router.get("/mailchimp/lists", controller.getLists.bind(controller));

export default router;
