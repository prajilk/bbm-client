import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <div className="w-full mt-auto bg-lime-950 p-10 text-white flex gap-2 justify-center items-center">
            <Mail size={15} className="flex-shrink-0" />
            <Link
                href="mailto://bigbutterflymonth@gmail.com"
                className="text-xs md:text-sm hover:text-primaryGreen"
            >
                bigbutterflymonth@gmail.com
            </Link>
            <span>|</span>
            <Phone size={15} className="flex-shrink-0" />
            <Link
                href="tel:9971293331"
                className="text-xs md:text-sm hover:text-primaryGreen"
            >
                9971293331
            </Link>
        </div>
    );
};

export default Footer;
