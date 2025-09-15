import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    const { data: inserted, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email })
      .select("id, created_at")
      .single();

    if (insertError) {
      if ((insertError as any).code === "23505") {
        return NextResponse.json({ error: "You are already on the waitlist" }, { status: 400 });
      }
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }


    const { count, error: countError } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const position = count ?? 0;


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: `"RVN Waitlist" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🎉 You’re on the RVN Waitlist!",
      text: `Thanks for signing up! Your position on the waitlist is #${position}. We’ll keep you updated.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to the RVN Waitlist</h2>
          <p>Thanks for signing up, <strong>${email}</strong>!</p>
          <p>Your position is: <strong>#${position}</strong></p>
          <p>We’ll notify you as we get closer to launch.</p>
          <br/>
          <p>— The RVN Team</p>
        </div>
      `,
    });

    return NextResponse.json({ position });
  } catch (err: any) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
