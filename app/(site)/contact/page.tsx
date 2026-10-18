"use client";

import { useState } from "react";
import Link from "next/link";

const hours = [
  { day: "Monday", h: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", h: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", h: "9:00 AM - 6:00 PM" },
  { day: "Thursday", h: "9:00 AM - 6:00 PM" },
  { day: "Friday", h: "9:00 AM - 6:00 PM" },
  { day: "Saturday", h: "10:00 AM - 5:00 PM" },
  { day: "Sunday", h: "Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    preference: "phone",
    message: "",
    marketingPhone: false,
    marketingEmail: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const field = (k: keyof typeof form, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: val }));

  const inputClass = (key: string) =>
    `w-full text-sm border rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-400 ${
      errors[key] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-navy-900">Contact Us</h1>
          <nav className="text-xs text-gray-400 mt-1 flex gap-1.5">
            <Link href="/" className="hover:text-gold-500">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Dealer info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-black text-navy-900 text-lg mb-4">Dealer Information</h2>

              <div className="flex items-start gap-3 mb-4">
                <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="text-sm">
                  <p className="font-semibold text-navy-900">18975 S State Street</p>
                  <p className="text-gray-500">Sandy, UT 84010</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:3855550100" className="text-sm font-semibold text-gold-600 hover:text-gold-500">385-555-0100</a>
              </div>

              {/* Map placeholder */}
              <div className="rounded-lg overflow-hidden bg-gray-200 h-48 relative mb-4">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2">
                  <svg className="w-10 h-10 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Sandy, UT 84010</span>
                  <a
                    href="https://maps.google.com/?q=18975+S+State+Street,+Sandy,+UT+84010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 text-xs underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <h3 className="font-bold text-navy-900 mb-3 text-sm">Business Hours</h3>
              <div className="space-y-1.5">
                {hours.map(({ day, h }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-500">{day}</span>
                    <span className={h === "Closed" ? "text-red-500 font-medium" : "text-navy-900"}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-black text-navy-900 text-xl mb-1">
                Call, Visit, or Send us a Quick Message.
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                If you need help with any aspect of the buying process, please don&apos;t hesitate to ask us. Our customer service representatives will be happy to assist you in any way, whether through simple phone, email, or in person, we&apos;re here to help you get the customer service you deserve.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. A member of our team will contact you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", phone: "", email: "", preference: "phone", message: "", marketingPhone: false, marketingEmail: false }); }}
                    className="mt-4 text-gold-600 text-sm font-semibold hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <p className="text-xs text-gray-400">All fields marked with an asterisk (*) are required.</p>

                  <p className="text-sm font-semibold text-gray-700">Contact Information</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => field("firstName", e.target.value)}
                        className={inputClass("firstName")}
                        placeholder="First Name"
                      />
                      {errors.firstName && <p className="text-xs text-red-500 mt-0.5">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => field("lastName", e.target.value)}
                        className={inputClass("lastName")}
                        placeholder="Last Name"
                      />
                      {errors.lastName && <p className="text-xs text-red-500 mt-0.5">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => field("phone", e.target.value)}
                        className={inputClass("phone")}
                        placeholder="(___) ___-____"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => field("email", e.target.value)}
                        className={inputClass("email")}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Contact preference */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Contact Preference</label>
                    <div className="flex gap-4">
                      {["phone", "email", "sms"].map((p) => (
                        <label key={p} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="preference"
                            value={p}
                            checked={form.preference === p}
                            onChange={() => field("preference", p)}
                          />
                          <span className="capitalize text-gray-700">{p === "sms" ? "SMS" : p.charAt(0).toUpperCase() + p.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Message *</label>
                    <div className="relative">
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => field("message", e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                        placeholder="How can we help you today?"
                        maxLength={1200}
                      />
                      <span className="absolute bottom-2 right-2 text-xs text-gray-400">{form.message.length}/1200</span>
                    </div>
                  </div>

                  {/* Marketing opt-ins */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.marketingPhone}
                        onChange={(e) => field("marketingPhone", e.target.checked)}
                        className="mt-0.5"
                      />
                      <span className="text-xs text-gray-500">
                        I want to receive marketing text messages on the phone number provided.
                      </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.marketingEmail}
                        onChange={(e) => field("marketingEmail", e.target.checked)}
                        className="mt-0.5"
                      />
                      <span className="text-xs text-gray-500">
                        I want to receive marketing emails, including updates and news, on the email address provided.
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 rounded text-sm transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center bg-white rounded-xl border border-gray-200 p-6">
          <div>
            <div className="text-gold-600 font-bold text-sm mb-1 uppercase tracking-wide">Address</div>
            <p className="text-sm text-gray-600">18975 S State Street<br />Sandy, UT 84010</p>
          </div>
          <div>
            <div className="text-gold-600 font-bold text-sm mb-1 uppercase tracking-wide">Hours</div>
            <p className="text-sm text-gray-600">Mon – Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 5:00 PM</p>
          </div>
          <div>
            <div className="text-gold-600 font-bold text-sm mb-1 uppercase tracking-wide">Phone</div>
            <a href="tel:3855550100" className="text-sm font-semibold text-navy-900 hover:text-gold-600">385-555-0100</a>
          </div>
        </div>
      </div>
    </div>
  );
}
