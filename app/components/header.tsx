import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-32 h-10">
            <Image
              src="/logo.png"
              alt="Ojest Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* <Link
            href="/cars"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Buy Cars
          </Link>
          <Link
            href="/sell"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Sell Your Car
          </Link> */}
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </header>
  );
}
