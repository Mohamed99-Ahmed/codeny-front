import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      {/* Footer contain some content about me */}
      <footer className=" py-6 bg-white  shadow-top text-xl">
        <div className="container gap-8 flex flex-col md:flex-row    items-center md:items-stretch justify-around  ">
          <h1 className="sColor uppercase font-extrabold  text-center text-sColor self-center">
            burger <br /> republic
          </h1>
          <article className="flex flex-col items-center justify-between gap-4 ">
            <div className="space-y-2">
              <p>الخظ الساخن</p>
              <h2 className="sColor text-2xl font-semibold">16897</h2>
            </div>
            <Link href="/stores" className="hover:text-sColor">
              فروعنا
            </Link>
          </article>
          <article className="flex flex-col items-center justify-between gap-6">
            <div className="space-y-2">
              <h2>صفحاتنا</h2>
              <div className="socials flex gap-4 justify-center text-2xl">
                <Link
                  href="https://www.facebook.com/Burger.Republic.EG/"
                  className="hover:text-sColor"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="https://www.instagram.com/burger__republic/?hl=en"
                  className="hover:text-sColor"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://www.tiktok.com/@burger_republic?is_from_webapp=1&sender_device=pc"
                  className="hover:text-sColor"
                >
                  <FaTiktok />
                </Link>
              </div>
            </div>
            <Link href="/opinions " className=" hover:text-sColor">
              رأي عملائنا
            </Link>
          </article>
        </div>
      </footer>
    </>
  );
}
