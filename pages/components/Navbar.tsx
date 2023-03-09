import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <span className="text-xl md:text-2xl font-bold text-blue-500">3D Render Demo</span>
          </Link>
          <div className="flex items-center">
            <Link href="/">
              <span className="mx-2 md:mx-4 text-gray-800 hover:text-blue-500">
                Features
              </span>
            </Link>
            <Link href="/">
              <span className="mx-2 md:mx-4 text-gray-800 hover:text-blue-500">
                Pricing
              </span>
            </Link>
            <Link href="/">
              <span className="mx-2 md:mx-4 text-gray-800 hover:text-blue-500">
                Contact
              </span>
            </Link>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
