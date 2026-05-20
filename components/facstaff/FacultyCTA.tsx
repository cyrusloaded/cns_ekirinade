import {UserPlus} from "lucide-react";

export default function FacultyCTA() {
  return (
    <div className="bg-gradient-to-br from-[#2C0050] to-[#2C0050]/90 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-start text-on-primary min-h-[420px]">
      <UserPlus className="w-14 h-14 sm:w-16 sm:h-16 mb-6 sm:mb-8 text-teal-400" />

      <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
        Join Our Distinguished Faculty
      </h3>

      <p className="text-white/80 mb-8 leading-relaxed text-sm sm:text-base">
        We are always looking for exceptional nursing educators and clinical
        professionals to join our growing team.
      </p>

      <a
        href="/vacancies"
        className="inline-flex bg-teal-400 text-primary font-bold px-7 sm:px-8 py-3 rounded-lg hover:bg-white transition-colors text-sm sm:text-base">
        View Vacancies
      </a>
    </div>
  );
}
