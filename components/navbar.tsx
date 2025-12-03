"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SearchInput from "./inputs/search-input";
import { motion, AnimatePresence } from "motion/react";

const navArrayButtons = [
  {
    name: "account",
    icon: "/icons/account.svg",
    activeIcon: "/icons/account-active.svg",
    route: "/account",
  },
  {
    name: "wishlist",
    icon: "/icons/wishlist.svg",
    activeIcon: "/icons/wishlist-active.svg",
    route: "/wishlist",
  },
  {
    name: "cart",
    icon: "/icons/cart.svg",
    activeIcon: "/icons/cart-active.svg",
    route: "/cart",
  },
];

const dropDownCategory = [
  {
    name: "Perfume",
    icon: "🌸",
    color: "from-rose-100 to-pink-100",
    subcategories: [
      { name: "Lattafa Asad", route: "/perfume/lattafa-asad" },
      {
        name: "Armaf Club de Nuit Intense",
        route: "/perfume/armaf-club-de-nuit",
      },
      { name: "Rasasi Hawas", route: "/perfume/rasasi-hawas" },
    ],
  },
  {
    name: "Body Mist",
    icon: "💫",
    color: "from-purple-100 to-violet-100",
    subcategories: [
      { name: "Armaf Vanity Femme", route: "/body-mist/armaf-vanity" },
      { name: "Lattafa Yara", route: "/body-mist/lattafa-yara" },
      { name: "Ajmal Wisal", route: "/body-mist/ajmal-wisal" },
    ],
  },
  {
    name: "Fragrance",
    icon: "🌹",
    color: "from-amber-100 to-orange-100",
    subcategories: [
      { name: "Oud Wood", route: "/fragrance/oud-wood" },
      { name: "Arabian Nights", route: "/fragrance/arabian-nights" },
      { name: "Musk Al Ghazal", route: "/fragrance/musk-al-ghazal" },
    ],
  },
  {
    name: "Decants",
    icon: "💧",
    color: "from-blue-100 to-cyan-100",
    subcategories: [
      { name: "Lattafa Khamrah 10ml", route: "/decants/lattafa-khamrah" },
      { name: "Armaf Hunter Intense 5ml", route: "/decants/armaf-hunter" },
      { name: "Rasasi La Yuqawam 10ml", route: "/decants/rasasi-la-yuqawam" },
    ],
  },
];

export const Navbar = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active nav based on pathname
  useEffect(() => {
    const matchingCategory = dropDownCategory.find((cat) =>
      cat.subcategories.some((sub) =>
        pathname.startsWith(sub.route.split("/")[1])
      )
    );
    setActiveNav(matchingCategory?.name || null);
  }, [pathname]);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <>
      {/* Top Bar - Announcement */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-amber-900 text-white text-center py-2 text-sm font-medium">
        🎁 Free shipping on orders over $50 • Limited Edition Holiday Scents
        Available
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-amber-100"
            : "bg-linear-to-b from-white via-white/95 to-white/90"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          {/* First Row - Logo, Search, Actions */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-amber-400 to-rose-400 rounded-full blur opacity-30 animate-pulse"></div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent relative z-10">
                  Scentsational
                </h1>
              </div>
              <span className="text-xs bg-linear-to-r from-amber-500 to-rose-500 text-white px-2 py-0.5 rounded-full font-medium">
                Luxury
              </span>
            </div>

            {/* Search Bar - Centered */}
            <div className="flex-1 max-w-2xl mx-8">
              <SearchInput />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {navArrayButtons.map((button) => {
                const isActive = pathname === button.route;
                return (
                  <motion.button
                    key={button.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => console.log(`Navigate to ${button.route}`)}
                    className={`relative group flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-amber-700 bg-linear-to-br from-amber-50 to-rose-50 shadow-lg"
                        : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={isActive ? button.activeIcon : button.icon}
                        alt={button.name}
                        className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                      />
                      {button.name === "cart" && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-rose-500 to-amber-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                          3
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium mt-1 capitalize">
                      {button.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 w-1/2 h-0.5 bg-linear-to-r from-amber-500 to-rose-500 rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Auth Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </div>
          </div>

          {/* Categories Menu */}
          <div className="mt-6 relative" ref={dropdownRef}>
            <div className="flex items-center justify-center gap-1">
              {dropDownCategory.map((cat) => {
                const isActive = activeNav === cat.name;
                const isOpen = openCategory === cat.name;

                return (
                  <div key={cat.name} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCategory(cat.name)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                        isActive || isOpen
                          ? `bg-linear-to-r ${cat.color} text-gray-900 shadow-lg`
                          : "text-gray-700 hover:text-gray-900 hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="text-gray-500"
                      >
                        ▼
                      </motion.span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="categoryIndicator"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-linear-to-r from-amber-500 to-rose-500 rounded-full"
                        />
                      )}
                    </motion.button>

                    {/* Animated Dropdown */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute left-1/2 transform -translate-x-1/2 top-14 bg-white shadow-2xl rounded-2xl p-6 min-w-[400px] z-50 border border-gray-100 ${
                            isScrolled ? "shadow-2xl" : "shadow-xl"
                          }`}
                        >
                          {/* Decorative header */}
                          <div
                            className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${cat.color} rounded-t-2xl`}
                          />

                          <div className="flex items-start gap-6">
                            {/* Icon Section */}
                            <div
                              className={`p-4 rounded-xl bg-linear-to-br ${cat.color}`}
                            >
                              <span className="text-3xl">{cat.icon}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                {cat.name}
                                <span className="text-xs bg-linear-to-r from-amber-500 to-rose-500 text-white px-2 py-1 rounded-full">
                                  Popular
                                </span>
                              </h3>

                              <div className="grid grid-cols-2 gap-3">
                                {cat.subcategories.map((sub, index) => (
                                  <motion.button
                                    key={sub.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{
                                      scale: 1.02,
                                      x: 5,
                                      backgroundColor:
                                        "rgba(251, 191, 36, 0.1)",
                                    }}
                                    onClick={() =>
                                      console.log(`Navigate to ${sub.route}`)
                                    }
                                    className="group text-left p-3 rounded-lg hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-linear-to-r from-amber-400 to-rose-400 group-hover:scale-150 transition-transform" />
                                      <span className="font-medium text-gray-800 group-hover:text-amber-700">
                                        {sub.name}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1 block group-hover:text-amber-600">
                                      Discover exquisite scents →
                                    </span>
                                  </motion.button>
                                ))}
                              </div>

                              {/* View All Button */}
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="mt-4 w-full py-3 bg-linear-to-r from-gray-50 to-gray-100 hover:from-amber-50 hover:to-rose-50 text-gray-700 hover:text-amber-700 rounded-lg font-medium transition-all duration-300 border border-gray-200 hover:border-amber-200 flex items-center justify-center gap-2"
                              >
                                View All {cat.name}
                                <span className="text-amber-600">→</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Decorative Line */}
            <div className="absolute -bottom-4 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-200 to-transparent" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Indicator - Shows on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-3 border border-amber-100"
          >
            <span className="text-xs font-semibold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Scentsational
            </span>
            <div className="flex items-center gap-1">
              {dropDownCategory.slice(0, 3).map((cat) => (
                <button
                  key={cat.name}
                  className="text-xs text-gray-600 hover:text-amber-700 px-2 py-1 rounded-full hover:bg-amber-50 transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
