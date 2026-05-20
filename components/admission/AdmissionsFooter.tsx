import Link from "next/link";

const resources = ["Privacy Policy", "Accreditation", "Contact Us", "Alumni"];

export default function AdmissionsFooter() {
  return (
    <footer className="w-full mt-20 bg-indigo-950">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 sm:px-8 lg:px-12 py-16 max-w-screen-2xl mx-auto">
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">
            College of Nursing Science
          </h2>

          <p className="text-slate-400 font-manrope text-sm leading-relaxed max-w-sm">
            © 2024 College of Nursing Science, Ekinrin-Adde. Healing through
            Knowledge and Faith.
          </p>

          <div className="mt-8 flex gap-4">
            <span className="material-symbols-outlined text-teal-400 cursor-pointer">
              social_leaderboard
            </span>
            <span className="material-symbols-outlined text-teal-400 cursor-pointer">
              language
            </span>
            <span className="material-symbols-outlined text-teal-400 cursor-pointer">
              mail
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-teal-400 font-bold mb-6 text-sm uppercase tracking-widest">
            Resources
          </h3>

          <ul className="space-y-4 font-manrope text-sm">
            {resources.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-opacity">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-teal-400 font-bold mb-6 text-sm uppercase tracking-widest">
            Campus
          </h3>

          <p className="text-slate-400 text-sm leading-loose">
            Main Campus, Ekinrin-Adde,
            <br />
            Kogi State, Nigeria.
            <br />
            P.M.B 1024
          </p>
        </div>
      </div>
    </footer>
  );
}
