import image from "./image.svg";

export default function NotFoundImage() {
  return (
    <div className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-center">
        
        {/* Mobile Image */}
        <img
          src={image}
          alt="404 illustration"
          className="block sm:hidden w-full"
        />

        {/* Text Content */}
        <div>
          <h1 className="font-medium text-[32px] sm:text-[34px] mb-4 font-[Outfit]">
            Something is not right...
          </h1>

          <p className="text-gray-500 text-lg">
            Page you are trying to open does not exist. You may have mistyped the
            address, or the page has been moved to another URL. If you think this
            is an error contact support.
          </p>

          <button
            className="mt-6 sm:mt-8 w-full sm:w-auto px-6 py-3 border border-gray-300
                       rounded-md text-sm font-medium hover:bg-gray-100 transition"
          >
            Get back to home page
          </button>
        </div>

        {/* Desktop Image */}
        <img
          src={image}
          alt="404 illustration"
          className="hidden sm:block w-full"
        />
      </div>
    </div>
  );
}