import { SpiritStatus, SpiritThreatLevel } from '@/entities/spirit';
import { mock } from '../route';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const interval = setInterval(() => {
        const activeSpirits = mock.filter(
          (s) => s.status === SpiritStatus.ACTIVE,
        );
        if (activeSpirits.length === 0) return;

        const randomSpirit =
          activeSpirits[Math.floor(Math.random() * activeSpirits.length)];

        const levels = [
          SpiritThreatLevel.LOW,
          SpiritThreatLevel.MEDIUM,
          SpiritThreatLevel.HIGH,
        ];
        const possibleNewLevels = levels.filter(
          (l) => l !== randomSpirit.threatLevel,
        );
        const newLevel =
          possibleNewLevels[
            Math.floor(Math.random() * possibleNewLevels.length)
          ];

        const idx = mock.findIndex(
          (s) =>
            s.name === randomSpirit.name &&
            s.location === randomSpirit.location,
        );
        if (idx !== -1) {
          mock[idx] = { ...mock[idx], threatLevel: newLevel };
        }

        const payload = {
          type: 'SPIRIT_THREAT_CHANGED',
          spirit: mock[idx] ?? { ...randomSpirit, threatLevel: newLevel },
          timestamp: Date.now(),
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
        );
      }, 5000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
