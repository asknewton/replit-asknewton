import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema } from "@shared/schema";
import { z } from "zod";

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

      // Send email notification
      await sendEmailNotification(lead);

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

async function sendEmailNotification(lead: any) {
  const emailApiKey = process.env.EMAIL_API_KEY;
  const notifyTo = process.env.NOTIFY_TO;
  
  if (!emailApiKey || !notifyTo) {
    console.log('Email notification skipped - missing configuration');
    return;
  }

  try {
    const subject = `New ${lead.persona} lead - ${lead.name}`;
    const html = `
      <h2>New Lead Submission</h2>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
      <p><strong>Persona:</strong> ${lead.persona}</p>
      
      <h3>Stay Details</h3>
      <p><strong>Arrival Date:</strong> ${lead.arrivalDate}</p>
      <p><strong>Stay Length:</strong> ${lead.stayLength}</p>
      <p><strong>Visa Status:</strong> ${lead.status || 'Not provided'}</p>
      <p><strong>ZIP Code:</strong> ${lead.zip}</p>
      <p><strong>Address:</strong> ${lead.address || 'Not provided'}</p>
      
      <h3>Insurance Information</h3>
      <p><strong>Current Coverage:</strong> ${lead.currentCoverage}</p>
      <p><strong>Pre-existing Conditions:</strong> ${lead.preexisting ? 'Yes' : 'No'}</p>
      <p><strong>Dependents:</strong> ${lead.dependents}</p>
      
      <h3>Additional Information</h3>
      <p><strong>Budget/Network Preferences:</strong> ${lead.budgetOrNetwork || 'Not provided'}</p>
      <p><strong>Notes:</strong> ${lead.notes || 'None'}</p>
      
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${emailApiKey}`
      },
      body: JSON.stringify({
        from: 'AskNewton <noreply@asknewton.com>',
        to: [notifyTo],
        subject,
        html
      })
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
}
