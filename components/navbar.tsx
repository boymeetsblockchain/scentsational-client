"use client";
import { useState } from "react";
import SearchInput from "./inputs/search-input";

const navArrayButtons = [
  { name: "account", icon: "/icons/account.svg", route: "/account" },
  { name: "wishlist", icon: "/icons/wishlist.svg", route: "/wishlist" },
  { name: "cart", icon: "/icons/cart.svg", route: "/cart" },
];

const dropDownCategory = [
  {
    name: "Perfume",
    subcategories: [
      { name: "Lattafa Asad", route: "/perfume/lattafa-asad" },
      {
        name: "Armaf Club de Nuit Intense",
        route: "/perfume/armaf-club-de-nuit",
      },
      { name: "Rasasi Hawas", route: "/perfume/rasasi-hawas" },
      { name: "Ajmal Aristocrat", route: "/perfume/ajmal-aristocrat" },
      {
        name: "Swiss Arabian Shaghaf Oud",
        route: "/perfume/swiss-arabian-shaghaf",
      },
      {
        name: "Fragrance World Oud Majestic",
        route: "/perfume/fragrance-world-oud",
      },
      { name: "Nabeel Black Musk", route: "/perfume/nabeel-black-musk" },
      {
        name: "Al Haramain L'Aventure",
        route: "/perfume/al-haramain-laventure",
      },
    ],
  },
  {
    name: "Body Mist",
    subcategories: [
      {
        name: "Armaf Vanity Femme Body Mist",
        route: "/body-mist/armaf-vanity",
      },
      { name: "Lattafa Yara Body Mist", route: "/body-mist/lattafa-yara" },
      { name: "Ajmal Wisal Body Mist", route: "/body-mist/ajmal-wisal" },
      {
        name: "Swiss Arabian Inara Body Mist",
        route: "/body-mist/swiss-arabian-inara",
      },
      { name: "Rasasi Romance Body Mist", route: "/body-mist/rasasi-romance" },
      {
        name: "Fragrance World Velvet Body Mist",
        route: "/body-mist/fragrance-world-velvet",
      },
    ],
  },
  {
    name: "Fragrance",
    subcategories: [
      { name: "Oud Wood Fragrance", route: "/fragrance/oud-wood" },
      { name: "Arabian Nights Fragrance", route: "/fragrance/arabian-nights" },
      { name: "Musk Al Ghazal", route: "/fragrance/musk-al-ghazal" },
      { name: "Amber Royale", route: "/fragrance/amber-royale" },
      { name: "Saffron & Rose", route: "/fragrance/saffron-rose" },
      { name: "Sandalwood Essence", route: "/fragrance/sandalwood-essence" },
      { name: "Velvet Orchid", route: "/fragrance/velvet-orchid" },
    ],
  },
  {
    name: "Decants",
    subcategories: [
      {
        name: "Lattafa Khamrah Decant 10ml",
        route: "/decants/lattafa-khamrah",
      },
      {
        name: "Armaf Hunter Intense Decant 5ml",
        route: "/decants/armaf-hunter",
      },
      {
        name: "Rasasi La Yuqawam Decant 10ml",
        route: "/decants/rasasi-la-yuqawam",
      },
      {
        name: "Ajmal Amber Wood Decant 5ml",
        route: "/decants/ajmal-amber-wood",
      },
      {
        name: "Swiss Arabian Shaghaf Decant 10ml",
        route: "/decants/swiss-arabian-shaghaf",
      },
      {
        name: "Fragrance World Sublime Decant 5ml",
        route: "/decants/fragrance-world-sublime",
      },
    ],
  },
  {
    name: "Perfume Oil",
    subcategories: [
      {
        name: "Al Rehab Choco Musk Oil",
        route: "/perfume-oil/al-rehab-choco-musk",
      },
      {
        name: "Nabeel Musk Tahara Oil",
        route: "/perfume-oil/nabeel-musk-tahara",
      },
      { name: "Ajmal Musk Oil", route: "/perfume-oil/ajmal-musk" },
      { name: "Arabian Oud Perfume Oil", route: "/perfume-oil/arabian-oud" },
      {
        name: "Swiss Arabian Attar Oil",
        route: "/perfume-oil/swiss-arabian-attar",
      },
      {
        name: "Rasasi Attar Al Mohabba Oil",
        route: "/perfume-oil/rasasi-attar",
      },
      { name: "Lattafa Raghba Oil", route: "/perfume-oil/lattafa-raghba" },
    ],
  },
  {
    name: "Body Spray",
    subcategories: [
      {
        name: "Armaf Skin Couture Body Spray",
        route: "/body-spray/armaf-skin-couture",
      },
      {
        name: "Lattafa Oud Mood Body Spray",
        route: "/body-spray/lattafa-oud-mood",
      },
      {
        name: "Ajmal Sacrifice Body Spray",
        route: "/body-spray/ajmal-sacrifice",
      },
      {
        name: "Rasasi Blue Lady Body Spray",
        route: "/body-spray/rasasi-blue-lady",
      },
      {
        name: "Swiss Arabian Mukhalat Body Spray",
        route: "/body-spray/swiss-arabian-mukhalat",
      },
      {
        name: "Fragrance World Imperial Body Spray",
        route: "/body-spray/fragrance-world-imperial",
      },
    ],
  },
  {
    name: "Attar",
    subcategories: [
      { name: "Al Haramain Attar", route: "/attar/al-haramain" },
      { name: "Ajmal Mukhallat Attar", route: "/attar/ajmal-mukhallat" },
      { name: "Rasasi Attar Al Oudh", route: "/attar/rasasi-al-oudh" },
      {
        name: "Swiss Arabian Concentrated Attar",
        route: "/attar/swiss-arabian-concentrated",
      },
      { name: "Nabeel Royal Attar", route: "/attar/nabeel-royal" },
    ],
  },
  {
    name: "Gift Sets",
    subcategories: [
      { name: "Lattafa Luxury Gift Set", route: "/gift-sets/lattafa-luxury" },
      {
        name: "Armaf Collection Gift Set",
        route: "/gift-sets/armaf-collection",
      },
      { name: "Rasasi Premium Gift Set", route: "/gift-sets/rasasi-premium" },
      {
        name: "Swiss Arabian Royal Gift Set",
        route: "/gift-sets/swiss-arabian-royal",
      },
      { name: "Ajmal Signature Gift Set", route: "/gift-sets/ajmal-signature" },
    ],
  },
];

export const Navbar = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <nav className="">
      <div className="flex items-center justify-between p-4 w-full max-w-screen-2xl mx-auto">
        <SearchInput />

        {/* logo */}
        <div>
          <h1 className="text-xl font-bold">Scentsational</h1>
        </div>

        <div className="flex items-center gap-4">
          {navArrayButtons.map((button) => (
            <button
              key={button.name}
              onClick={() => console.log(`Navigate to ${button.route}`)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              aria-label={button.name}
            >
              <img src={button.icon} alt={button.name} className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Categories Menu */}
      <div className="">
        <div className="flex items-center justify-center gap-8 text-sm font-medium">
          {dropDownCategory.map((cat) => (
            <div key={cat.name} className="relative">
              {/* Category Button */}
              <button
                onClick={() => toggleCategory(cat.name)}
                className="hover:text-gray-900 transition text-gray-700"
              >
                {cat.name}
              </button>

              {/* Dropdown */}
              {openCategory === cat.name && (
                <div className="absolute left-0 top-8 bg-white shadow-lg rounded-md p-3 w-48 z-50">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => console.log(`Navigate to ${sub.route}`)}
                      className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
