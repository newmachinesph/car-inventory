import Link from "next/link";

const hours = [
  { day: "Mon", hours: "9:00 AM – 6:00 PM" },
  { day: "Tue", hours: "9:00 AM – 6:00 PM" },
  { day: "Wed", hours: "9:00 AM – 6:00 PM" },
  { day: "Thu", hours: "9:00 AM – 6:00 PM" },
  { day: "Fri", hours: "9:00 AM – 6:00 PM" },
  { day: "Sat", hours: "10:00 AM – 5:00 PM" },
  { day: "Sun", hours: "Closed" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-navy-800 border border-gold-500/30 rounded-lg flex items-center justify-center">
                <span className="text-gold-500 font-black text-sm">AO</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-black text-sm tracking-tight">ALPINE OVERLAND</div>
                <div className="text-gold-500/70 text-[10px] tracking-widest">SANDY, UTAH</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>18975 S State Street<br />Sandy, UT 84010</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:3855550100" className="hover:text-gold-400 transition-colors">385-555-0100</a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Inventory", href: "/inventory" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Apply Online", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-gold-400 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gold-500/40 group-hover:bg-gold-500 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Store Hours</h3>
            <ul className="space-y-1.5 text-sm">
              {hours.map(({ day, hours: h }) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="text-gray-500">{day}</span>
                  <span className={h === "Closed" ? "text-red-400 font-medium" : "text-gray-300"}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Follow Us</h3>
            <div className="flex gap-2.5 mb-4">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Instagram", path: null, isInstagram: true },
                { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map(({ label, path, isInstagram }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 bg-navy-800 hover:bg-gold-500 border border-navy-700 hover:border-gold-500 rounded-lg flex items-center justify-center transition-all group">
                  {isInstagram ? (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-navy-900 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-navy-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path!} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Visit us at our Sandy, UT location or browse our full inventory online.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Alpine Overland. All rights reserved.</span>
          <Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
