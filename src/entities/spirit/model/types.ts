import { z } from 'zod';

export enum SpiritStatus {
  ACTIVE = 'ACTIVE',
  CAPTURED = 'CAPTURED',
}

export enum SpiritThreatLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const SpiritSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  threatLevel: z.enum(SpiritThreatLevel),
  status: z.enum(SpiritStatus),
});

export type Spirit = z.infer<typeof SpiritSchema>;
