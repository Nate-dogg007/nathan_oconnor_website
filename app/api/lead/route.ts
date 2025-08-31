import { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
const body = await req.json().catch(()=>null);
if (!body) return new Response('Bad JSON', { status: 400 });


const { name, email, phone, message, marketingOptIn, attrib } = body || {};
if (!name || !email) return new Response('Missing required fields', { status: 400 });


// Minimal server-side validation
const emailOk = /.+@.+\..+/.test(email);
if (!emailOk) return new Response('Invalid email', { status: 400 });


// Build a normalized payload (PII raw is only on server; cookies keep only hashes)
const payload = {
name, email, phone, message,
marketingOptIn: !!marketingOptIn,
digify: attrib || {},
receivedAt: new Date().toISOString(),
sourceIp: req.headers.get('x-forwarded-for') || 'unknown',
userAgent: req.headers.get('user-agent') || 'unknown',
};


// TODO: Forward to Twenty CRM when configured
// Example (pseudo; replace with actual Twenty API):
// await fetch(process.env.TWENTY_API_URL + '/leads', {
// method: 'POST',
// headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.TWENTY_API_KEY}` },
// body: JSON.stringify({ ...payload })
// });


// For now, log for verification (consider removing in production)
console.log('[LEAD]', JSON.stringify(payload));


return new Response(null, { status: 202 });
}
