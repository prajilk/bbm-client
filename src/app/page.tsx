import Container from "@/components/container";
import Hero from "@/components/hero/hero";
import PartnersMarquee from "@/components/marquee/partners";
import TestimonialSlider from "@/components/slider/testimonial-slider";
import Bulb from "@/lib/svgs/bulb";
import Butterfly from "@/lib/svgs/butterfly";
import Handshake from "@/lib/svgs/handshake";

export default function Home() {
    return (
        <>
            <Hero />
            <div className="bg-lime-900 w-full">
                <Container>
                    <div
                        className="bg-lime-700 w-full grid grid-cols-1 md:grid-cols-3"
                        id="explore"
                    >
                        <div className="h-full bg-lime-900 text-center gap-3 text-white py-10 px-5 md:px-16 flex flex-col items-center justify-center">
                            <Handshake />
                            <h1 className="text-lg font-bold">Welcome</h1>
                            <p className="text-xs md:text-sm leading-relaxed">
                                Welcome to &#34;Big Butterfly Month,&#34; a
                                thrilling citizen science program that takes
                                place annually throughout the month of
                                September! This program invites individuals of
                                all ages and backgrounds to join us in studying
                                and celebrating the incredible world of
                                butterflies.
                            </p>
                        </div>
                        <div className="h-full text-center gap-3 text-white py-10 px-5 md:px-16 flex flex-col items-center justify-center">
                            <Butterfly />
                            <h1 className="text-lg font-bold">
                                At Big Butterfly Month
                            </h1>
                            <p className="text-xs md:text-sm leading-relaxed">
                                We recognize the vital role that citizen
                                scientists like you can play in collecting
                                important data and contributing to our
                                understanding of these remarkable and delicate
                                creatures. Our program focuses on butterflies,
                                captivating insects that are not only beautiful
                                but also serve as essential pollinators and
                                indicators of ecosystem health.
                            </p>
                        </div>
                        <div className="h-full bg-lime-900 text-center gap-3 text-white py-10 px-5 md:px-16 flex flex-col items-center justify-center">
                            <Bulb />
                            <h1 className="text-lg font-bold">
                                Why Butterflies
                            </h1>
                            <p className="text-xs md:text-sm leading-relaxed">
                                Butterflies are renowned for their enchanting
                                beauty, their intricate life cycles, and their
                                ecological significance. By studying
                                butterflies, we can gain insights into the
                                health of our environment, the impact of climate
                                change, and the effectiveness of conservation
                                efforts.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            {/* <PartnersMarquee /> */}
            {/* <TestimonialSlider /> */}
        </>
    );
}
