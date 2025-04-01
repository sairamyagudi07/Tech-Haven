const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm md:text-base">
            © 2025 Tech Haven. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-xs sm:text-sm md:text-base transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-xs sm:text-sm md:text-base transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-xs sm:text-sm md:text-base transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;