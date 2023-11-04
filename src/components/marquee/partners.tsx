"use client";

import { PARTNERS_LEFT, PARTNERS_RIGHT } from "@/lib/data";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartnersMarquee = () => {
    return (
        <div className="py-10 space-y-10">
            <h1 className="mx-auto text-xl md:text-3xl font-semibold border-b-2 border-primaryGreen w-fit">
                Our Partners
            </h1>
            <Marquee gradient={true} gradientWidth={100}>
                {PARTNERS_LEFT.map((partner, i) => (
                    <div
                        className="relative w-[100px] aspect-[16/10] md:w-[110px] md:aspect-[16/10] mx-5 md:mx-10"
                        key={i}
                    >
                        <Image
                            src={`/partners/${partner}`}
                            alt="partners"
                            fill
                            sizes="(max-with: 640px) 100px, (min-width: 769px) 110px"
                        />
                    </div>
                ))}
            </Marquee>
            <Marquee gradient={true} direction="right" gradientWidth={100}>
                {PARTNERS_RIGHT.map((partner, i) => (
                    <div
                        className="relative w-[100px] aspect-[16/10] md:w-[110px] md:aspect-[16/10] mx-5 md:mx-10"
                        key={i}
                    >
                        <Image
                            src={`/partners/${partner}`}
                            alt="partners"
                            fill
                            sizes="(max-with: 640px) 100px, (min-width: 769px) 110px"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default PartnersMarquee;
