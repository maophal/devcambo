"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "km", name: "Khmer", flag: "🇰🇭" },
  ];

  // Determine the currently selected language based on the URL locale
  const currentLocale = pathname.split('/')[1]; // Extracts "en" or "km" from "/en/page" or "/km/page"
  const selectedLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];


  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-1"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl">{selectedLanguage.flag}</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={pathname}
                locale={language.code}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                role="menuitem"
                id={`menu-item-${language.code}`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span className="text-xl">{language.flag}</span> {language.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
