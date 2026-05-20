import Link from "next/link";
import {MapPin, Phone, Mail, Share2, Medal, BriefcaseMedical} from "lucide-react";
import type {FooterContent} from "@/types/cms";

export default function Footer({content}: {content: FooterContent}) {
  return (
    <footer className="bg-[#1F1B4B] text-gray-300 mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-white font-semibold text-lg">
            <div className="bg-[#00C2A8]/20 p-2 rounded-lg">
              <BriefcaseMedical className="text-[#00C2A8]" size={18} />
            </div>
            <span>{content.brandName}</span>
          </div>

          <p className="mt-4 text-sm text-gray-400 italic">{content.tagline}</p>

          <div className="flex gap-3 mt-6">
            <div className="bg-white/10 p-3 rounded-lg hover:bg-white/20 cursor-pointer transition"><Medal size={18} /></div>
            <div className="bg-white/10 p-3 rounded-lg hover:bg-white/20 cursor-pointer transition"><Share2 size={18} /></div>
          </div>
        </div>

        {content.quickLinks.map((group) => (
          <div key={group.title}>
            <h4 className="text-[#00C2A8] text-sm font-semibold uppercase tracking-wider mb-5">{group.title}</h4>
            <ul className="space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-[#00C2A8] text-sm font-semibold uppercase tracking-wider mb-5">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-[#00C2A8] mt-1" size={18} />
              <span>{content.addressLines.map((line, index) => <span key={index}>{line}{index < content.addressLines.length - 1 ? <br /> : null}</span>)}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#00C2A8]" size={18} />
              <a href={`tel:${content.phone.replace(/\s+/g, "")}`} className="hover:text-white">{content.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-[#00C2A8]" size={18} />
              <a href={`mailto:${content.email}`} className="hover:text-white break-all">{content.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">{content.bottomText}</div>
    </footer>
  );
}
