"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Landing Pages");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onClose();
        setName("");
        setEmail("");
        setMessage("");
      }, 2000);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Direct Studio Access</span>
          </div>
          <h2
            id="contact-modal-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]"
          >
            Start your project
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Tell us about your problem and we’ll respond within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="py-12 flex flex-col items-center text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-[var(--ink)]">
              Message Received!
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-xs">
              Thank you for reaching out. We will review your request and get back
              to you right away.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5"
              >
                What are you looking to build?
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              >
                <option value="Email Design">Email Design &amp; Newsletters</option>
                <option value="Landing Pages">Landing Pages &amp; Webflow/Next</option>
                <option value="Social Systems">Social Media Post Systems</option>
                <option value="Data Analytics">Data Analytics &amp; Dashboards</option>
                <option value="AI Agents">AI Agents &amp; Automations</option>
                <option value="Full Suite">Full Suite / Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5"
              >
                Brief Overview
              </label>
              <textarea
                id="message"
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your goals, timeline, or current bottlenecks..."
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--ink)] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-2 py-3 px-5 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>
                {status === "submitting" ? "Sending..." : "Send Request"}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
