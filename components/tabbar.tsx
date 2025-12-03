"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navArrayButtons = [
  {
    name: "home",
    activeIcon: "/icons/home-active.svg",
    inactiveIcon: "/icons/home.svg",
    route: "/",
  },
  {
    name: "wishlist",
    activeIcon: "/icons/wishlist-active.svg",
    inactiveIcon: "/icons/wishlist.svg",
    route: "/wishlist",
  },
  {
    name: "cart",
    activeIcon: "/icons/cart-active.svg",
    inactiveIcon: "/icons/cart.svg",
    route: "/cart",
  },
  {
    name: "account",
    activeIcon: "/icons/account-active.svg",
    inactiveIcon: "/icons/account.svg",
    route: "/account",
  },
];

export const TabBar = () => {
  const pathname = usePathname();

  // Find active tab based on current route
  const getActiveTabFromRoute = () => {
    // Check exact match first
    const exactMatch = navArrayButtons.find(
      (button) => button.route === pathname
    );
    if (exactMatch) return exactMatch.name;

    // Check for nested routes (e.g., /account/profile)
    const nestedMatch = navArrayButtons.find((button) =>
      pathname.startsWith(button.route + "/")
    );
    return nestedMatch?.name || "home";
  };

  const activeTab = getActiveTabFromRoute();

  return (
    <div className="md:hidden fixed bottom-10 left-0 right-0 h-20 grid place-content-center w-full">
      <div className="bg-primary rounded-[100px] z-50 px-4 shadow-lg shadow-black/10 backdrop-blur-sm">
        <nav className="flex items-center justify-around py-2 gap-2">
          {navArrayButtons.map((button) => {
            const isActive = activeTab === button.name;

            return (
              <Link
                key={button.name}
                href={button.route}
                className={`
                  group flex items-center gap-2 px-4 py-2 rounded-full
                  transition-all duration-300 ease-out
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${
                    isActive
                      ? "bg-white text-gray-900 shadow-md"
                      : "text-gray-600 hover:text-gray-900 "
                  }
                `}
                aria-label={button.name}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative flex items-center justify-center">
                  {!isActive && (
                    <div className="absolute h-9 w-9 rounded-full bg-[#38768D]/80 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#38768D]" />
                  )}

                  {button.name === "cart" && (
                    <span className="absolute -top-4 -right-1 w-5 h-5 bg-linear-to-r from-primary to-primary/80 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                      3
                    </span>
                  )}

                  <img
                    src={isActive ? button.activeIcon : button.inactiveIcon}
                    alt={button.name}
                    className={`
                      relative z-10 h-5 w-5 transition-transform duration-300 ease-out
                      ${
                        isActive
                          ? "scale-110"
                          : "scale-100 group-hover:scale-105"
                      }
                    `}
                  />
                </div>

                <span
                  className={`
                    text-sm capitalize font-medium transition-all duration-300
                    overflow-hidden whitespace-nowrap
                    ${
                      isActive
                        ? "max-w-[100px] opacity-100 translate-x-0 font-bold text-primary"
                        : "max-w-0 opacity-0 -translate-x-2"
                    }
                  `}
                >
                  {button.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
