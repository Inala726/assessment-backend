import { Request, Response } from "express";
import { MailchimpServiceImpl } from "../services/implementation/mailchimp.services.impl";

const mailchimpService = new MailchimpServiceImpl();

export class MailchimpController {
  async integrate(req: Request, res: Response) {
    try {
      const { apiKey } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }

      const isValid = await mailchimpService.validateApiKey(apiKey);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid API key" });
      }

      const integration = await mailchimpService.saveIntegration(apiKey, isValid);
      return res.status(201).json({ integration });
    } catch (error: any) {
      console.error("Mailchimp integration error:", error.message);
      return res.status(500).json({ error: "Failed to integrate with Mailchimp" });
    }
  }

  async getLists(req: Request, res: Response) {
    try {
      const { apiKey } = req.query;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }

      const lists = await mailchimpService.getLists(apiKey as string);
      return res.status(200).json({ lists });
    } catch (error: any) {
      console.error("Mailchimp lists error:", error.message);
      return res.status(500).json({ error: "Failed to fetch Mailchimp lists" });
    }
  }
}
