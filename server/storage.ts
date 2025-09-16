import { type User, type InsertUser, type Lead, type InsertLead, users, leads } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
}

export class DatabaseStorage implements IStorage {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await this.db
      .insert(leads)
      .values({
        ...insertLead,
        phone: insertLead.phone?.trim() || null,
        address: insertLead.address?.trim() || null,
        budgetOrNetwork: insertLead.budgetOrNetwork?.trim() || null,
        notes: insertLead.notes?.trim() || null,
        status: insertLead.status || null,
        preexisting: !!insertLead.preexisting,
        consent: !!insertLead.consent,
      })
      .returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return await this.db.select().from(leads);
  }
}

// Keep MemStorage for fallback
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead,
      phone: insertLead.phone?.trim() || null,
      address: insertLead.address?.trim() || null,
      budgetOrNetwork: insertLead.budgetOrNetwork?.trim() || null,
      notes: insertLead.notes?.trim() || null,
      status: insertLead.status || null,
      preexisting: !!insertLead.preexisting,
      consent: !!insertLead.consent,
      id, 
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
}

// Lazy storage initialization
let storageInstance: IStorage | null = null;

async function getStorage(): Promise<IStorage> {
  if (storageInstance) {
    return storageInstance;
  }

  if (process.env.DATABASE_URL) {
    try {
      const { db } = await import("./db");
      // Test database connection
      await db.select().from(leads).limit(1);
      storageInstance = new DatabaseStorage(db);
      console.log('Using database storage');
      return storageInstance;
    } catch (error) {
      console.warn('Database connection failed, falling back to memory storage:', error);
    }
  }
  
  storageInstance = new MemStorage();
  console.log('Using memory storage');
  return storageInstance;
}

export { getStorage as storage };