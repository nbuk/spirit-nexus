import { Spirit, SpiritStatus, SpiritThreatLevel } from '@/entities/spirit';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const caughtSpiritSchema = z.object({
  id: z.number(),
});

export const mock: Spirit[] = [
  {
    id: 1,
    name: 'Shibuya Crossing Yūrei',
    location: 'Shibuya-ku',
    threatLevel: SpiritThreatLevel.MEDIUM,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 2,
    name: 'Shinjuku Gyoen Shade',
    location: 'Shinjuku-ku',
    threatLevel: SpiritThreatLevel.HIGH,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 3,
    name: 'Chiyoda Palace Phantom',
    location: 'Chiyoda-ku',
    threatLevel: SpiritThreatLevel.LOW,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 4,
    name: 'Minato Bay Wisp',
    location: 'Minato-ku',
    threatLevel: SpiritThreatLevel.MEDIUM,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 5,
    name: 'Asakusa Lantern Spirit',
    location: 'Taitō-ku',
    threatLevel: SpiritThreatLevel.LOW,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 6,
    name: 'Sumida River Whisper',
    location: 'Sumida-ku',
    threatLevel: SpiritThreatLevel.MEDIUM,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 7,
    name: 'Setagaya Green Shade',
    location: 'Setagaya-ku',
    threatLevel: SpiritThreatLevel.LOW,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 8,
    name: 'Meguro Alley Specter',
    location: 'Meguro-ku',
    threatLevel: SpiritThreatLevel.MEDIUM,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 9,
    name: 'Bunkyō Library Poltergeist',
    location: 'Bunkyō-ku',
    threatLevel: SpiritThreatLevel.LOW,
    status: SpiritStatus.ACTIVE,
  },
  {
    id: 10,
    name: 'Kōtō Warehouse Wraith',
    location: 'Kōtō-ku',
    threatLevel: SpiritThreatLevel.HIGH,
    status: SpiritStatus.ACTIVE,
  },
];

export async function GET() {
  return Response.json(mock);
}

export async function POST(req: Request) {
  try {
    const { id } = caughtSpiritSchema.parse(await req.json());
    const spirit = mock.find((s) => s.id === id);
    if (!spirit)
      return Response.json({ message: 'Spirit not found' }, { status: 404 });

    if (Math.random() < 0.3) {
      return Response.json({ message: 'Random failure' }, { status: 500 });
    }

    spirit.status = SpiritStatus.CAPTURED;
    return Response.json({ message: 'Spirit caught' });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Invalid request' }, { status: 400 });
  }
}
