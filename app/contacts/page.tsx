import ContactHero from "@/components/contacts/ContactHero";
import ContactInfoCard from "@/components/contacts/ContactInfoCard";
import OfficeHoursCard from "@/components/contacts/OfficeHoursCard";
import ContactForm from "@/components/contacts/ContactForm";
import ContactMap from "@/components/contacts/ContactMap";
import {getPageContent} from "@/lib/cms";
import type {ContactPageContent} from "@/types/cms";

export default async function ContactPage() {
  const page = await getPageContent<ContactPageContent>("contacts");

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
        <ContactHero content={page.content.hero} />

        <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 sm:space-y-8 lg:col-span-4">
            <ContactInfoCard content={page.content.infoCard} />
            <OfficeHoursCard content={page.content.officeHours} />
          </div>

          <div className="lg:col-span-8">
            <ContactForm content={page.content.form} />
          </div>
        </section>

        <ContactMap content={page.content.map} />
      </main>
    </div>
  );
}
