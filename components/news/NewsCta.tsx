export default function NewsCta() {
  return (
    <section className="mx-auto mt-16 max-w-screen-2xl px-4 sm:px-6 lg:mt-24 lg:px-8">
      <div className="rounded-[2rem] bg-primary p-8 text-center sm:p-10 lg:p-14">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
          Join the Next Generation of Excellence
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          Applications are currently open for the new academic session. Begin
          your journey toward becoming a world-class nursing professional.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-primary transition hover:-translate-y-0.5">
            Download Brochure
          </button>
          <button className="rounded-full border border-white/40 px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-white/10">
            Apply Online
          </button>
        </div>
      </div>
    </section>
  );
}
