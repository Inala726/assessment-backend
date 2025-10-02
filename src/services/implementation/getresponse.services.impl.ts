import axios from "axios";
import { Integration } from "../../../generated/prisma";
import { db } from "../../config/db";
import { GetResponseService } from "../getresponse.service";
import dotenv from "dotenv";

dotenv.config();

export class GetResponseServiceImpl implements GetResponseService {
  private baseUrl = process.env.GETRESPONSE_BASE_URL;

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const res = await axios.get(`${this.baseUrl}/accounts`, {
        headers: {
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      });
      return res.status === 200;
    } catch (error) {
      return false;
    }
  }

  async saveIntegration(apiKey: string, validated: boolean): Promise<Integration> {
    return db.integration.create({
      data: {
        service: "getresponse",
        apiKey,
        validated,
      },
    });
  }

  async getLists(apiKey: string): Promise<any[]> {
    try {
      const res = await axios.get(`${this.baseUrl}/campaigns`, {
        headers: {
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      });
      return res.data || [];
    } catch (error: any) {
      console.error("Error fetching GetResponse lists:", error.response?.data || error.message);
      throw new Error("Failed to fetch GetResponse lists");
    }
  }
}
