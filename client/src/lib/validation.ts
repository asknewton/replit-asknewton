import { z } from 'zod';

export const personaEnum = z.enum(['nomad','traveler','student']);
export const stayLengthEnum = z.enum(['lt90','3to6','6to12','12plus']);
export const statusEnum = z.enum(['ESTA','B1','B2','F1','J1','Other']);
export const currentCoverageEnum = z.enum(['none','travel','employer','university','marketplace','other']);
export const dependentsEnum = z.enum(['none','spouse','children','both']);

export const leadSchema = z.object({
  persona: personaEnum,
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().optional().or(z.literal('')),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  stayLength: stayLengthEnum,
  status: statusEnum,
  zip: z.string().trim().min(3, 'ZIP is required'),
  currentCoverage: currentCoverageEnum,
  preexisting: z.boolean(),
  dependents: dependentsEnum,
  address: z.string().trim().optional().or(z.literal('')),
  budgetOrNetwork: z.string().trim().optional().or(z.literal('')),
  notes: z.string().trim().optional().or(z.literal('')),
  consent: z.boolean().refine(v => v === true, { message: 'Consent required' }),
});

export type LeadFormData = z.infer<typeof leadSchema>;
