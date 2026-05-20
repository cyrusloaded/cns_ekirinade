import Image from "next/image";

export default function NewsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-primary mb-10">
          Campus Chronicles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="h-56 relative">
              <Image
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
                alt="News"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-xs text-secondary font-bold uppercase">
                Academic • June 2024
              </p>
              <h4 className="text-xl font-bold text-primary mt-2">
                2024 Matriculation Ceremony
              </h4>
              <p className="text-sm text-on-surface-variant">
                Welcoming our newest nursing students...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
