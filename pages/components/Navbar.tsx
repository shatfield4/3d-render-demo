import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-black fixed top-0 w-full">
        <div className="flex justify-between items-center py-4 px-10">


        <Link href="/">
          <div className="flex items-center text-white">
          <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M165.963 134.037C160.496 139.504 151.631 139.504 146.164 134.037L122.027 109.899C116.559 104.432 116.559 95.5678 122.027 90.1005L146.164 65.9631C151.631 60.4957 160.496 60.4957 165.963 65.9631L190.101 90.1004C195.568 95.5678 195.568 104.432 190.101 109.899L165.963 134.037ZM53.8359 134.037C48.3686 139.504 39.5042 139.504 34.0369 134.037L9.89952 109.899C4.43218 104.432 4.43217 95.5678 9.89951 90.1005L34.0369 65.9631C39.5042 60.4957 48.3686 60.4957 53.8359 65.9631L77.9733 90.1004C83.4406 95.5678 83.4406 104.432 77.9733 109.899L53.8359 134.037ZM109.9 190.1C104.432 195.568 95.5679 195.568 90.1005 190.1L65.9631 165.963C60.4958 160.496 60.4958 151.631 65.9631 146.164L90.1005 122.027C95.5679 116.559 104.432 116.559 109.9 122.027L134.037 146.164C139.504 151.631 139.504 160.496 134.037 165.963L109.9 190.1ZM109.9 77.9732C104.432 83.4405 95.5679 83.4406 90.1005 77.9732L65.9631 53.8358C60.4958 48.3685 60.4958 39.5042 65.9631 34.0368L90.1005 9.89946C95.5679 4.43212 104.432 4.43211 109.9 9.89945L134.037 34.0368C139.504 39.5042 139.504 48.3685 134.037 53.8358L109.9 77.9732Z" fill="url(#paint0_linear_105_379)"/> <defs> <linearGradient id="paint0_linear_105_379" x1="154.166" y1="35.9433" x2="47.2475" y2="144.745" gradientUnits="userSpaceOnUse"> <stop offset="0.0509862" stop-color="#FFB6E1"/> <stop offset="1" stop-color="#FBE3EA"/> </linearGradient> </defs> </svg>
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 animate-gradient-x whitespace-nowrap ml-2">
            BrandBuddy
            </h1>
          </div>
        </Link>


          <div className="flex items-center">
            <Link href="/">
              <span className="mx-2 md:mx-4 text-white hover:text-blue-500">
                Features
              </span>
            </Link>
            <Link href="/">
              <span className="mx-2 md:mx-4 text-white hover:text-blue-500">
                Pricing
              </span>
            </Link>
            <Link href="/">
              <span className="mx-2 md:mx-4 text-white hover:text-blue-500">
                Contact
              </span>
            </Link>
            <button className="font-bold py-2 px-4 rounded-lg ml-4 text-center text-white text-sm bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 border border-transparent cursor-pointer gradient-animation hover:outline">
              Sign Up
            </button>
          </div>
        </div>
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradient-x 6s ease infinite alternate;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
