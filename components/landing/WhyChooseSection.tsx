// "use client";

// import {Microscope, SquarePlus} from "lucide-react";
// import Image from "next/image";

// export default function WhyChooseSection() {
//   return (
//     <section className="bg-[#EFF1F4] py-6 mt-8 sm:mt-10">
//       <section className="py-10 sm:py-14 md:py-20">
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
//           {/* Header */}
//           <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
//             <h2 className="text-[#320056] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
//               Why Choose Ekinrin-Adde?
//             </h2>
//             <p className="text-base sm:text-lg text-slate-600 font-semibold">
//               Where your calling meets professional excellence.
//             </p>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-12 auto-rows-fr">
//             {/* Professional Excellence */}
//             <div className="flex items-center md:col-span-8 bg-[#320056] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 text-white relative overflow-hidden group">
//               <Image
//                 src="/whychoose.png"
//                 alt="Medical lab"
//                 fill
//                 className="object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
//               />
//               <div className="relative z-10">
//                 <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-3 sm:mb-4">
//                   Professional Excellence
//                 </h3>
//                 <p className="text-sm sm:text-base md:text-lg text-[#efd8ff] max-w-md">
//                   Curriculum aligned with international standards taught by
//                   experienced medical professionals.
//                 </p>
//               </div>
//             </div>

//             {/* Faith-Based */}
//             <div className="flex flex-col justify-between md:col-span-4 bg-[#00B4D8] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10">
//               <SquarePlus
//                 size={40}
//                 className="self-end text-muted-100 opacity-20 sm:size-[50px] md:size-[60px]"
//                 strokeWidth={2}
//               />

//               <div>
//                 <h3 className="text-xl sm:text-2xl md:text-3xl text-[#005768] font-bold mb-2 sm:mb-3">
//                   Faith-Based Approach
//                 </h3>
//                 <p className="text-sm sm:text-base md:text-lg text-[#005768]">
//                   Nursing as a ministry. We nurture both clinical skill and
//                   spiritual character.
//                 </p>
//               </div>
//             </div>

//             {/* Modern Facilities */}
//             <div className="md:col-span-4 bg-[#E0E3E6] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
//                 <Microscope
//                   className="text-[#320056]"
//                   size={20}
//                   strokeWidth={2.5}
//                 />
//               </div>
//               <h3 className="text-xl sm:text-2xl text-[#320056] font-bold mb-2 sm:mb-3">
//                 Modern Facilities
//               </h3>
//               <p className="text-slate-600 text-sm sm:text-base md:text-lg">
//                 Advanced simulation labs and digital learning resources.
//               </p>
//             </div>

//             {/* Campus Life */}
//             <div className="md:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 border-l-4 border-[#005768]">
//               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
//                 {/* Image - now visible on small screens too */}
//                 <div className="w-full sm:w-40 md:w-52 h-40 sm:h-40 md:h-52 rounded-2xl sm:rounded-3xl overflow-hidden relative">
//                   <Image
//                     src="/campuslife.png"
//                     alt="Campus life"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 <div>
//                   <h3 className="text-xl sm:text-2xl text-[#320056] font-bold mb-2 sm:mb-3">
//                     Vibrant Campus Life
//                   </h3>
//                   <p className="text-slate-600 text-sm sm:text-base md:text-lg">
//                     Peaceful environment in Ekinrin-Adde perfect for focused
//                     study and spiritual growth.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// }

"use client";

import {Microscope, SquarePlus} from "lucide-react";
import Image from "next/image";
import type {WhyChooseContent} from "@/types/cms";

export default function WhyChooseSection({
  content,
}: {
  content?: WhyChooseContent;
}) {
  const data = content || {
    title: "Why Choose Ekinrin-Adde?",
    subtitle: "Where your calling meets professional excellence.",
    items: [],
  };

  return (
    // <section className="bg-[#F8F9FA] py-12 sm:py-16 md:py-20">
    //   <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
    //     {/* Header */}
    //     <div className="text-center mb-12 sm:mb-16">
    //       <h2 className="text-[#320056] text-4xl sm:text-5xl font-bold tracking-tight">
    //         {data.title}
    //       </h2>
    //       <p className="mt-3 text-lg text-slate-600 font-medium">
    //         {data.subtitle}
    //       </p>
    //     </div>

    //     {/* Cards Grid */}
    //     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
    //       {data.items.map((item) => (
    //         <div
    //           key={item.id}
    //           className={`relative rounded-3xl overflow-hidden p-8 sm:p-10 md:p-12 flex flex-col justify-between group ${
    //             item.layout === "large" ? "md:col-span-8" : "md:col-span-4"
    //           }`}
    //           style={{
    //             backgroundColor: item.backgroundColor,
    //             color: item.textColor,
    //           }}>
    //           {item.image && (
    //             <Image
    //               src={item.image.src}
    //               alt={item.image.alt}
    //               fill
    //               className="object-cover opacity-25 group-hover:opacity-30 transition-all duration-700"
    //             />
    //           )}

    //           <div className="relative z-10">
    //             {item.icon && (
    //               <div className="mb-6">
    //                 {item.icon === "squarePlus" && (
    //                   <SquarePlus size={48} className="opacity-80" />
    //                 )}
    //                 {item.icon === "microscope" && (
    //                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
    //                     <Microscope size={32} className="text-[#320056]" />
    //                   </div>
    //                 )}
    //               </div>
    //             )}

    //             <h3 className="text-2xl sm:text-3xl font-bold mb-4">
    //               {item.title}
    //             </h3>
    //             <p className="text-base sm:text-lg leading-relaxed opacity-90">
    //               {item.description}
    //             </p>

    //             {item.image && item.layout === "image" && (
    //               <div className="mt-6 rounded-2xl overflow-hidden border border-white/30">
    //                 <Image
    //                   src={item.image.src}
    //                   alt={item.image.alt}
    //                   width={420}
    //                   height={260}
    //                   className="w-full object-cover"
    //                 />
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    // <section className="bg-[#F8F9FA] py-16 lg:py-24">
    //   <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    //     {/* Header */}
    //     <div className="mx-auto max-w-3xl text-center">
    //       <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#320056]">
    //         {data.title}
    //       </h2>

    //       <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
    //         {data.subtitle}
    //       </p>
    //     </div>

    //     {/* Cards */}
    //     <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
    //       {data.items.map((item, index) => {
    //         const row = Math.floor(index / 2);
    //         const isEvenRow = row % 2 === 0;

    //         // Alternating layout
    //         const isLarge = isEvenRow ? index % 2 === 0 : index % 2 === 1;

    //         return (
    //           <article
    //             key={item.id}
    //             className={`relative overflow-hidden rounded-[32px]
    //           shadow-md transition-all duration-500
    //           hover:-translate-y-1 hover:shadow-2xl
    //           ${
    //             isLarge
    //               ? "lg:col-span-8 min-h-[340px]"
    //               : "lg:col-span-4 min-h-[340px]"
    //           }`}
    //             style={{
    //               backgroundColor: item.backgroundColor,
    //               color: item.textColor,
    //             }}>
    //             {/* Background Image */}
    //             {item.image && (
    //               <>
    //                 <Image
    //                   src={item.image.src}
    //                   alt={item.image.alt}
    //                   fill
    //                   className="object-cover opacity-20 transition duration-700 group-hover:scale-105"
    //                 />

    //                 <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/40" />
    //               </>
    //             )}

    //             {/* Content */}
    //             <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 lg:p-10">
    //               {/* Icon */}
    //               {item.icon && (
    //                 <div className="mb-8">
    //                   {item.icon === "squarePlus" && (
    //                     <SquarePlus size={48} className="opacity-90" />
    //                   )}

    //                   {item.icon === "microscope" && (
    //                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
    //                       <Microscope size={30} className="text-[#320056]" />
    //                     </div>
    //                   )}
    //                 </div>
    //               )}

    //               <div className={`${isLarge ? "max-w-2xl" : "max-w-md"}`}>
    //                 <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
    //                   {item.title}
    //                 </h3>

    //                 <p className="mt-5 text-base leading-7 opacity-90">
    //                   {item.description}
    //                 </p>
    //               </div>

    //               <div className="flex-1" />

    //               {/* Small cards show image at bottom */}
    //               {!isLarge && item.image && (
    //                 <div className="mt-8 overflow-hidden rounded-2xl border border-white/20">
    //                   <Image
    //                     src={item.image.src}
    //                     alt={item.image.alt}
    //                     width={700}
    //                     height={450}
    //                     className="h-60 w-full object-cover transition-transform duration-700 hover:scale-105"
    //                   />
    //                 </div>
    //               )}
    //             </div>
    //           </article>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </section>

    <section className="bg-[#F8F9FA] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#320056]">
            {data.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
            {data.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {data.items.map((item, index) => {
            const row = Math.floor(index / 2);
            const isEvenRow = row % 2 === 0;

            // Alternating pattern
            // Row 1: Large | Small
            // Row 2: Small | Large
            const isLarge = isEvenRow ? index % 2 === 0 : index % 2 === 1;

            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden rounded-[32px] shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isLarge
                    ? "lg:col-span-8 h-[250px]"
                    : "lg:col-span-4 h-[250px]"
                }`}
                style={{
                  backgroundColor: item.backgroundColor,
                  color: item.textColor,
                }}>
                {/* Background Image */}
                {isLarge && item.image && (
                  <>
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Original dark overlay */}
                    <div className="absolute inset-0 bg-[#320056]/65 group-hover:bg-black/40 transition-colors duration-500" />
                  </>
                )}

                <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  {/* Icon */}
                  {item.icon && (
                    <div className="mb-8">
                      {item.icon === "squarePlus" && <SquarePlus size={50} />}

                      {item.icon === "microscope" && (
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                          <Microscope size={30} className="text-[#320056]" />
                        </div>
                      )}
                    </div>
                  )}

                  {isLarge ? (
                    <div className="flex flex-1 items-center">
                      <div className="max-w-2xl">
                        <h3 className="text-3xl lg:text-5xl font-bold leading-tight text-white">
                          {item.title}
                        </h3>

                        <p className="mt-6 text-md text-[#efd8ff] leading-8">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="max-w-md">
                        <h3
                          className="text-2xl lg:text-2xl font-bold leading-tight"
                          style={{color: item.textColor}}>
                          {item.title}
                        </h3>

                        <p
                          className="mt-2 text-base leading-7 opacity-90"
                          style={{color: item.textColor}}>
                          {item.description}
                        </p>
                      </div>

                      <div className="flex-1" />

                      {item.image && (
                        <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={700}
                            height={450}
                            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
