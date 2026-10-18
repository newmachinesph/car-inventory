import Image from "next/image";
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

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-navy-900">About Us</h1>
          <p className="text-gray-500 text-sm mt-1">Sandy, Utah&apos;s Premier Overland Dealer</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: content */}
          <div className="lg:col-span-2">
            {/* Promo image */}
            <div className="relative rounded-lg overflow-hidden mb-8 bg-navy-900">
              <Image
                src="/hero.jpg"
                alt="Alpine Overland team"
                width={900}
                height={400}
                className="w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-gold-400 font-semibold text-sm tracking-widest uppercase mb-2">Call our dealer today!</p>
                  <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
                    WE ARE HAPPY<br />TO ASSIST YOU
                  </h2>
                  <a
                    href="tel:3855550100"
                    className="mt-4 inline-block bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded text-sm transition-colors"
                  >
                    385-555-0100
                  </a>
                </div>
              </div>
            </div>

            {/* About text */}
            <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
              <p>
                With years of experience serving the area, our dealership is dedicated to offering high-quality, pre-owned vehicles to our customers. From the moment you walk through our door, we&apos;re committed to providing you with a great car-buying experience. With our skilled team and financing options, we&apos;ll help you get the vehicle you want, at the great price you deserve.
              </p>
              <p>
                Our goal is for you to be as delighted with your vehicle purchase as you are when you need us in the future. Customer satisfaction is what drives us, and we look forward to recommending us to friends and family. Customer referrals are the ultimate compliment.
              </p>
              <p>
                You have multiple vehicle shopping options available, yet Alpine Overland is committed to expanding our local car-buying community and satisfying its needs; helping valued local customers like you find the vehicle that&apos;s the &ldquo;right fit.&rdquo;
              </p>
              <p>
                Feel free to browse our online inventory and then use the Financed Vehicles section on our website to get a quick quote, or simply request a test drive. For one vehicle you like, submit an online quick quote, update an application, or contact us to schedule a test drive. We look forward to serving you!
              </p>
              <p>
                To learn more about our dealership and how we can help with your next vehicle purchase, please call or drop by in person. We look forward to meeting you. Visit our Instagram and Facebook pages to stay connected!
              </p>
            </div>

            {/* Contact links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:3855550100" className="flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-navy-800 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                385-555-0100
              </a>
              <Link href="/contact" className="flex items-center gap-2 border-2 border-navy-900 text-navy-900 text-sm font-semibold px-5 py-2.5 rounded hover:bg-navy-900 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/inventory" className="flex items-center gap-2 bg-gold-500 text-navy-900 text-sm font-semibold px-5 py-2.5 rounded hover:bg-gold-600 transition-colors">
                View Inventory
              </Link>
            </div>

            {/* Bottom hours (mobile only) */}
            <div className="mt-10 lg:hidden">
              <h3 className="font-bold text-navy-900 mb-3">Business Hours</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {hours.map(({ day, h }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-500">{day}</span>
                    <span className={h === "Closed" ? "text-red-500 font-medium" : "text-navy-900"}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: dealership info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-black text-navy-900 text-lg mb-4">Dealership Information</h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">18975 S State Street</p>
                  <p className="text-sm text-gray-500">Sandy, UT 84010</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a href="tel:3855550100" className="text-sm font-semibold text-gold-600 hover:text-gold-500">
                  385-555-0100
                </a>
              </div>

              {/* Hours */}
              <div className="hidden lg:block">
                <h3 className="font-bold text-navy-900 mb-3 text-sm uppercase tracking-wide">Business Hours</h3>
                <div className="space-y-2">
                  {hours.map(({ day, h }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500">{day}</span>
                      <span className={h === "Closed" ? "text-red-500 font-medium" : "text-navy-900 font-medium"}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 rounded-lg overflow-hidden bg-gray-200 h-40 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
                  <svg className="w-8 h-8 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="font-medium">Sandy, UT 84010</span>
                  <a
                    href="https://maps.google.com/?q=18975+S+State+Street,+Sandy,+UT+84010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 text-xs underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team / Values strip */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { num: "15+", label: "Years Serving Utah" },
            { num: "5,000+", label: "Happy Customers" },
            { num: "200+", label: "Vehicles in Stock" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-gold-500 text-4xl font-black mb-1">{num}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
