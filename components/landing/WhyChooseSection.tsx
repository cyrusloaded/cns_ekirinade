"use client";

import {Microscope, SquarePlus} from "lucide-react";
import Image from "next/image";

export default function WhyChooseSection() {
  return (
    <section className="bg-[#EFF1F4] py-6 mt-8 sm:mt-10">
      <section className="py-10 sm:py-14 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-[#320056] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
              Why Choose Ekinrin-Adde?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-semibold">
              Where your calling meets professional excellence.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-12 auto-rows-fr">
            {/* Professional Excellence */}
            <div className="flex items-center md:col-span-8 bg-[#320056] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 text-white relative overflow-hidden group">
              <Image
                src="/whychoose.png"
                alt="Medical lab"
                fill
                className="object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-3 sm:mb-4">
                  Professional Excellence
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[#efd8ff] max-w-md">
                  Curriculum aligned with international standards taught by
                  experienced medical professionals.
                </p>
              </div>
            </div>

            {/* Faith-Based */}
            <div className="flex flex-col justify-between md:col-span-4 bg-[#00B4D8] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10">
              <SquarePlus
                size={40}
                className="self-end text-muted-100 opacity-20 sm:size-[50px] md:size-[60px]"
                strokeWidth={2}
              />

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl text-[#005768] font-bold mb-2 sm:mb-3">
                  Faith-Based Approach
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[#005768]">
                  Nursing as a ministry. We nurture both clinical skill and
                  spiritual character.
                </p>
              </div>
            </div>

            {/* Modern Facilities */}
            <div className="md:col-span-4 bg-[#E0E3E6] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Microscope
                  className="text-[#320056]"
                  size={20}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-xl sm:text-2xl text-[#320056] font-bold mb-2 sm:mb-3">
                Modern Facilities
              </h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                Advanced simulation labs and digital learning resources.
              </p>
            </div>

            {/* Campus Life */}
            <div className="md:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 border-l-4 border-[#005768]">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                {/* Image - now visible on small screens too */}
                <div className="w-full sm:w-40 md:w-52 h-40 sm:h-40 md:h-52 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    src="/campuslife.png"
                    alt="Campus life"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl text-[#320056] font-bold mb-2 sm:mb-3">
                    Vibrant Campus Life
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                    Peaceful environment in Ekinrin-Adde perfect for focused
                    study and spiritual growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
