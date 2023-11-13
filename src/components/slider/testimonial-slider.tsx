"use client";

import Quote from "@/lib/svgs/quote";
import { useState } from "react";
import Container from "../container";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { testimonials } from "@/lib/data";

const TestimonialSlider = () => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        if (index < testimonials.length - 1) setIndex((prev) => prev + 1);
        else if (index === testimonials.length - 1) setIndex(0);
    };
    const prevSlide = () => {
        if (index > 0) setIndex((prev) => prev - 1);
        else if (index === 0) setIndex(0);
    };

    return (
        <div className="bg-white">
            <Container className="space-y-0 md:space-y-8 pt-10">
                <h1 className="mx-auto text-xl md:text-3xl font-semibold border-b-2 border-primaryGreen w-fit">
                    Testimonials
                </h1>

                <div className="flex">
                    <button onClick={prevSlide}>
                        <ChevronLeft />
                    </button>
                    <div className="relative h-full w-full overflow-hidden flex">
                        {testimonials.map((testimonial, i) => (
                            <div
                                className={`flex-shrink-0 flex-grow-0 duration-300 py-20 w-full`}
                                style={{ translate: `${-100 * index}%` }}
                                key={i}
                            >
                                <div className="text-center mx-auto px-5 md:px-10 flex flex-col justify-center items-center gap-7 relative max-w-5xl">
                                    <Quote className="absolute -top-5 left-0" />
                                    <p className="text-sm max-w-5xl mx-auto">
                                        {testimonial.testimonial}
                                    </p>
                                    <span className="w-5 h-0.5 bg-primaryGreen" />
                                    <h2 className="text-lg font-semibold">
                                        {testimonial.name}
                                    </h2>
                                    <Quote className="absolute -bottom-5 right-5 rotate-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextSlide}>
                        <ChevronRight />
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default TestimonialSlider;
