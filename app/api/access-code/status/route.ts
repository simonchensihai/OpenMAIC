import { cookies } from 'next/headers';
import { apiSuccess } from '@/lib/server/api-response';
import { verifyAccessToken } from '@/app/api/access-code/verify/route';

export async function GET() {
  console.log('[DEBUG] GET /api/access-code/status');
  const accessCode = process.env.ACCESS_CODE;
  const enabled = !!accessCode;
  console.log('[DEBUG] enabled:', enabled);

  let authenticated = false;
  try {
    if (enabled && accessCode) {
      const cookieStore = await cookies();
      const token = cookieStore.get('openmaic_access')?.value;
      authenticated = !!token && verifyAccessToken(token, accessCode);
    }
  } catch (err) {
    console.error('[DEBUG] status error:', err);
  }

  return apiSuccess({ enabled, authenticated });
}
