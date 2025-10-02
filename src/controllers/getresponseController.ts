import { Request, Response } from "express";
import { GetResponseServiceImpl } from "../services/implementation/getresponse.services.impl";

const getResponseService = new GetResponseServiceImpl();

export class GetResponseController {
  async integrate(req: Request, res: Response) {
    try {
      const { apiKey } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }

      const isValid = await getResponseService.validateApiKey(apiKey);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid API key" });
      }

      const integration = await getResponseService.saveIntegration(apiKey, isValid);
      return res.status(201).json({ integration });
    } catch (error: any) {
      console.error("GetResponse integration error:", error.message);
      return res.status(500).json({ error: "Failed to integrate with GetResponse" });
    }
  }

  async getLists(req: Request, res: Response) {
    try {
      const { apiKey } = req.query;
      if (!apiKey) {
        return res.status(400).json({ error: "API key is required" });
      }

      const lists = await getResponseService.getLists(apiKey as string);
      return res.status(200).json({ lists });
    } catch (error: any) {
      console.error("GetResponse lists error:", error.message);
      return res.status(500).json({ error: "Failed to fetch GetResponse lists" });
    }
  }
}
