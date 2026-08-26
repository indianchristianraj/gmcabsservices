import { Link } from "@tanstack/react-router";
import { Pic } from "@/components/Pic";
import { EMAIL, EMAIL_RENTALS, ADDRESS, PHONE, telLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Pic name="gm-logo" alt="GM Cabs Services" width={44} height={44} sizes="44px" className="rounded-lg" />
            <div>
              <div className="font-display text-base font-bold text-white">GM Cabs Services</div>
              <div className="text-[10px] uppercase tracking-widest text-orange">Airport · One Way · Outstation</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/70">Premium airport taxi, one way & luxury outstation cabs across Telangana & Andhra Pradesh.</p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-primary-foreground/80 hover:text-orange">Home</Link></li>
            <li><Link to="/" hash="fleet" className="text-primary-foreground/80 hover:text-orange">Fleet</Link></li>
            <li><Link to="/" hash="routes" className="text-primary-foreground/80 hover:text-orange">Routes</Link></li>
            <li><Link to="/" hash="contact" className="text-primary-foreground/80 hover:text-orange">Contact</Link></li>
            <li><Link to="/services" className="text-primary-foreground/80 hover:text-orange">Services</Link></li>
            <li><Link to="/book" className="text-primary-foreground/80 hover:text-orange">Book Now</Link></li>
            <li><Link to="/fare-estimate" className="text-primary-foreground/80 hover:text-orange">Fare Estimate</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            {["Airport Pickup & Drop", "One Way Taxi", "Outstation Cab", "Luxury Car Rental", "Corporate Travel"].map((l) => (
              <li key={l}><Link to="/services" className="text-primary-foreground/80 hover:text-orange">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>📞 <a href={telLink} className="hover:text-orange">{PHONE}</a></li>
            <li>✉️ <a href={`mailto:${EMAIL}`} className="hover:text-orange break-all">{EMAIL}</a></li>
            <li>✉️ <a href={`mailto:${EMAIL_RENTALS}`} className="hover:text-orange break-all">{EMAIL_RENTALS}</a></li>
            <li>📍 {ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/70 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} GM Cabs Services. All rights reserved.</div>
          <div>Proprietor: Mohsin Khan</div>
        </div>
      </div>
    </footer>
  );
}
