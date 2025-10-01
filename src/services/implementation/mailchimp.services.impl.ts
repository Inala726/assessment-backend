import { Integration } from "../../../generated/prisma";
import { MailchimpService } from "../mailchimp.services";
import axios from "axios";
import { db } from "../../config/db";

export class MailchimpServiceImpl implements MailchimpService {
    private baseUrl(apiKey: string) {
        const dc = apiKey.split("-")[1];
        if (!dc) throw new Error("Invalid Mailchimp API key format");
        return `https://${dc}.api.mailchimp.com/3.0`;
    }

    async getLists(apiKey: string): Promise<any[]> {
        try {
            const res = await axios.get(`${this.baseUrl(apiKey)}/lists`, {
                auth: { username: "anystring", password: apiKey },
            });
            return res.data.lists || [];
        } catch (error) {
            throw new Error("Failed to fetch Mailchimp lists");
        }
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        try {
            const res = await axios.get(`${this.baseUrl(apiKey)}/ping`, {
                auth: { username: "anystring", password: apiKey },
            });
            return res.status === 200;
        } catch (error) {
            return false;
        }
    }

    async saveIntegration(apiKey: string, validated: boolean): Promise<Integration> {
        const integration = await db.integration.create({
            data: {
                service: "mailchimp",
                apiKey,
                validated,
            },
        });
        return integration;
    }
}