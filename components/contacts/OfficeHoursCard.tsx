import type {ContactPageContent} from "@/types/cms";

export default function OfficeHoursCard({content}: {content: ContactPageContent["officeHours"]}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8 lg:p-10">
      <h3 className="mb-5 font-headline text-xl font-bold text-primary sm:mb-6 sm:text-2xl">{content.title}</h3>

      <div className="space-y-4">
        {content.items.map((item, index) => {
          const isLast = index === content.items.length - 1;
          return (
            <div key={item.label} className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${!isLast ? "border-b border-outline-variant/20 pb-3" : ""}`}>
              <span className="text-sm text-on-surface-variant sm:text-base">{item.label}</span>
              <span className={`text-sm font-bold text-primary sm:text-base ${item.valueClassName ?? ""}`}>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
