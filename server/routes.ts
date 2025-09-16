import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema } from "@shared/schema";
import { z } from "zod";
import { sendLeadNotification, type LeadNotificationData } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/lead", async (req, res) => {
    try {
      const parsed = leadSchema.parse(req.body);
      
      // Create lead in storage
      const storageInstance = await storage();
      const lead = await storageInstance.createLead(parsed);

      // Forward to webhook if configured
      const webhookUrl = process.env.WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...lead })
          });
        } catch (error) {
          console.error('Webhook error:', error);
          // Don't fail the request if webhook fails
        }
      }

      // Send email notification using SendGrid
      await sendLeadNotification(lead);

      res.status(201).json({ success: true, leadId: lead.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        console.error('Lead creation error:', error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get leads endpoint (admin only - for debugging)
  app.get("/api/leads", async (req, res) => {
    // Require admin API key for security
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      const storageInstance = await storage();
      const leads = await storageInstance.getLeads();
      res.json(leads);
    } catch (error) {
      console.error('Get leads error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
