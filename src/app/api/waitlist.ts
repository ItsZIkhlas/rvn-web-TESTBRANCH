import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return res.status(400).json({ message: "Invalid email" });

  try {
    // Insert email if not exists
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email })
      .select()
      .single();

    if (insertError && insertError.code !== "23505") {
      return res.status(500).json({ message: insertError.message });
    }

    // Fetch joined_at timestamp for this email
    const { data: userData, error: userError } = await supabase
      .from("waitlist")
      .select("joined_at")
      .eq("email", email)
      .single();

    if (userError || !userData) return res.status(500).json({ message: "Failed to fetch waitlist position" });

    // Count how many are ahead in waitlist
    const { count } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .lte("joined_at", userData.joined_at); // <= to include self

    const position = count ?? 1;

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RVN Waitlist" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your RVN Waitlist Position",
      html: `<p>Hi! You are currently <strong>#${position}</strong> on the RVN waitlist. Thank you for joining!</p>`,
    });

    return res.status(200).json({ message: "You’ve joined the waitlist! Your position has been emailed." });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
