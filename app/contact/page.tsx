"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, ChevronDown } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const FAQS = [
  {
    q: "How are living terrariums shipped safely without shifting?",
    a: "Every terrarium is cradled inside a precision-molded high-density foam insert with damp thermal insulation around the vessel. Containers are double-boxed and shipped via express logistics with fragile and live-plant labeling.",
  },
  {
    q: "Do closed terrariums really need zero regular watering?",
    a: "Yes! A sealed ecosystem operates on a continuous natural water cycle. Moisture evaporates from the soil, condenses on the cool glass, and precipitates back into the root substrate. They only need a misting once every 3 to 6 months.",
  },
  {
    q: "Can I commission custom terrarium or aquascape dimensions?",
    a: "Absolutely. We build bespoke paludariums, bioactive vivariums, and desk biotope cubes tailored to homes and commercial studios. Use the form on this page or visit our custom builder.",
  },
  {
    q: "What happens if a plant arrives stressed or damaged?",
    a: "We guarantee 100% Live Arrival. If any glass breaks or any flora is stressed upon arrival, message us within 24 hours of delivery with a photo, and we will send a free replacement or instant refund.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Terrarium Consultation",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "Terrarium Consultation", message: "" });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
          <span>STUDIO LIAISON</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-zinc-950 tracking-tight">
          Connect with Our Botanical Team
        </h1>
        <p className="text-base text-zinc-500 font-normal leading-relaxed">
          Questions about ecosystem health, bespoke installations, or shipping inquiries? We reply within 4 business hours.
        </p>
      </div>

      {/* 2-Column Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Form inside pastel aura canvas */}
        <div className="lg:col-span-7 pastel-aura-canvas rounded-[32px] p-6 sm:p-10 flex items-center justify-center shadow-sm">
          <div className="bg-white rounded-[24px] p-6 sm:p-10 w-full shadow-xl shadow-zinc-900/5 space-y-6 border border-white/60">
            <div>
              <h3 className="text-xl font-bold text-zinc-950">Send a Studio Message</h3>
              <p className="text-xs text-zinc-500 mt-1">We treat every inquiry with personalized care.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">Message Transmitted Successfully</h4>
                <p className="text-xs">Our botanical specialists will review your note and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Sharma"
                      className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@example.com"
                      className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all cursor-pointer"
                    >
                      <option value="Terrarium Consultation">Terrarium Consultation</option>
                      <option value="Custom Installation">Custom Installation</option>
                      <option value="Order & Shipping">Order & Shipping Status</option>
                      <option value="Care Troubleshooting">Care Troubleshooting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room, lighting, or specific terrarium ideas..."
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl p-4 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all resize-y"
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  variant="dark"
                  className="w-full py-3.5 px-6 rounded-xl text-[15px] font-semibold shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Studio</span>
                </AnimatedButton>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Contact Details Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#f4f4f6] rounded-[32px] p-8 border border-zinc-200/60 space-y-6">
            <h3 className="text-xl font-bold text-zinc-950">Studio Information</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-zinc-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900">Botanical Lab Studio</p>
                  <p className="text-zinc-500">Koramangala 4th Block, Bangalore, Karnataka 560034</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-zinc-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900">Direct Email</p>
                  <p className="text-zinc-500">care@aquaterra.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-5 h-5 text-zinc-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900">Dispatch & Consultation Hours</p>
                  <p className="text-zinc-500">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f4f4f6] rounded-[32px] p-8 border border-zinc-200/60 space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              URGENT PLANT HEALTH
            </span>
            <h4 className="text-base font-bold text-zinc-950">Have a transit emergency?</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              If an ecosystem was delivered with package stress, WhatsApp our priority desk directly at <span className="font-mono font-bold text-zinc-900">+91 91234 56789</span> for immediate assistance.
            </p>
          </div>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6 pt-6">
        <div>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#f4f4f6] rounded-2xl border border-zinc-200/60 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-zinc-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-zinc-900" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
