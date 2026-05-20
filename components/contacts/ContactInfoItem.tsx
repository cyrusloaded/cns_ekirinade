import {ReactNode} from "react";

type ContactInfoItemProps = {
  icon: ReactNode;
  title: string;
  lines: string[];
};

export default function ContactInfoItem({
  icon,
  title,
  lines,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
          {title}
        </p>

        <div className="mt-1 space-y-1">
          {lines.map((line) => (
            <p
              key={line}
              className="break-words text-sm leading-6 text-on-surface-variant sm:text-base">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
