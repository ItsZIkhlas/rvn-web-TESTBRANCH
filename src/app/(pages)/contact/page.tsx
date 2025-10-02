"use client";

import { useState } from "react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";
import NavBar from "@/components/NavBar";
import { Mail, Phone, CheckCircle, XCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Error parsing response:", err);
      }

      if (res.ok && data?.success) {
        setStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you shortly.",
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message:
            data?.error || "Failed to send message. Please try again later.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Error sending message. Check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-black to-blue-900/40 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.25),transparent_60%)] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.25),transparent_60%)] z-0" />

      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      <section className="relative z-10 max-w-6xl mx-auto py-24 px-6 lg:px-12 mt-20">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-12">
          Contact{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Raven
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                {status && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded ${
                      status.type === "success"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6 text-white">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-gray-300">
              Have questions, feedback, or want to work with us? Reach out using
              the form, or hit us directly through the details below.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-lg">
                <Mail className="w-5 h-5 text-violet-400" />
                rvn.console.dev@gmail.com
              </p>
              <p className="flex items-center gap-3 text-lg">
                <Phone className="w-5 h-5 text-violet-400" />
                (703) 537-9828
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
