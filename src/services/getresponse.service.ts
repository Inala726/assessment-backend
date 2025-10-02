import { Integration } from "@prisma/client";

export interface GetResponseService {
  validateApiKey(apiKey: string): Promise<boolean>;
  saveIntegration(apiKey: string, validated: boolean): Promise<Integration>;
  getLists(apiKey: string): Promise<any[]>;
}
