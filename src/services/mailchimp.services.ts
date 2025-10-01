import { Integration } from "../../generated/prisma";

export interface MailchimpService {
    validateApiKey(apiKey: string): Promise<boolean>;
    saveIntegration(apiKey: string, validated: boolean): Promise<Integration>;
    
}