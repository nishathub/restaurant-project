import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#E0E0E0]">
      <footer className="text-gray-900">
        {/* CONTACT INFO  */}
        <section className="py-8 xl:pt-16 max-w-7xl mx-auto footer px-8 items-start md:justify-items-center">
          <nav>
            <h6 className="font-bold mb-2 uppercase text-lg md:text-xl">
              Policy
            </h6>
            <a className="link link-hover">Return Policy</a>
            <a className="link link-hover">Refund Policy</a>
            <a className="link link-hover">Cancellation Policy</a>
            <a className="link link-hover">Privacy Policy</a>
          </nav>
          <nav>
            <h6 className="font-bold mb-2 uppercase text-lg md:text-xl">
              About Us
            </h6>
            <a className="link link-hover">Terms and Conditions</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Announcement</a>
          </nav>
          <nav>
            <h6 className="font-bold mb-2 uppercase text-lg md:text-xl">
              Social
            </h6>
            <div className="grid grid-flow-col gap-4">
              <a className="text-lg md:text-2xl hover:text-blue-400 duration-300 cursor-pointer">
                <FaFacebookF />
              </a>
              <a className="text-lg md:text-2xl hover:text-gray-800 duration-300 cursor-pointer">
                <FaXTwitter />
              </a>
              <a className="text-lg md:text-2xl hover:text-red-400 duration-300 cursor-pointer">
                <FaYoutube />
              </a>
            </div>
          </nav>
        </section>
        {/* COPYRIGHT INFO  */}
        <section className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              Restaurant
            </p>
          </aside>
        </section>
      </footer>
    </div>
  );
};

export default Footer;