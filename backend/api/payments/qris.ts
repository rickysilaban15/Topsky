import type { VercelRequest, VercelResponse } from '@vercel/node';
import midtransClient from 'midtrans-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Izinkan CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Tangani preflight OPTIONS
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Hanya boleh POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order_id, amount } = req.body || {};
  if (!order_id || !amount) {
    return res.status(400).json({ message: 'order_id & amount wajib' });
  }

  // Setup Midtrans Core API
  const core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY as string,
    clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
  });

  try {
    // Buat transaksi QRIS
    const charge = await core.charge({
      payment_type: 'qris',
      transaction_details: {
        order_id,
        gross_amount: Number(amount),
      },
    });

    // Ambil link QR dari response Midtrans
    const qrAction =
      charge.actions?.find((a: any) => a.name?.includes('qr')) || charge.actions?.[0];

    return res.status(200).json({
      order_id,
      transaction_status: charge.transaction_status,
      qr_url: qrAction?.url || null,
      qr_string: (charge as any).qr_string || null,
    });
  } catch (err: any) {
    console.error('QRIS error:', err?.response?.data || err.message);
    return res.status(500).json({ message: 'Gagal membuat QRIS' });
  }
}
