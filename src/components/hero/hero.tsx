import Link from "next/link";
import Container from "../container";
import { Button } from "../ui/button";

const Hero = () => {
    return (
        <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-white/5 sm:bg-transparent sm:from-white/25 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
            <Container>
                <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                    <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl sm:text-6xl text-white font-extralight md:font-thin">
                            Journey into the
                        </h1>
                        <span className="text-3xl sm:text-6xl font-light text-white md:my-3 block">
                            World of
                        </span>
                        <strong className="text-3xl sm:text-6xl block font-bold text-white">
                            Butterflies.
                        </strong>
                        <Link href="#explore">
                            <Button className="bg-primaryGreen hover:bg-green-600 mt-3">
                                Explore.
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
