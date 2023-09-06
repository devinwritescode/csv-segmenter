import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const Profile: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const dropdownElement = document.getElementById("dropdown-user");
      const buttonElement = document.getElementById("profile-button");

      if (event.target instanceof Node) {
        if (
          !dropdownElement?.contains(event.target) &&
          !buttonElement?.contains(event.target)
        ) {
          setMenuOpen(false);
        }
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="ml-auto flex items-center">
      <div className="relative">
        <div>
          <button
            id="profile-button"
            type="button"
            className="flex text-sm bg-slate-800 rounded-full focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaCircleUser className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {menuOpen && (
          <div
            className="absolute right-0 z-50 mt-3 text-base list-none bg-white divide-y divide-slate-100 rounded-md overflow-hidden shadow dark:bg-slate-700 dark:divide-slate-600"
            id="dropdown-user"
          >
            <div className="px-4 py-3">
              <p className="text-sm text-slate-900 dark:text-white">
                Devin Alexander
              </p>
              <p className="text-sm font-medium text-slate-900 truncate dark:text-slate-300">
                devin.a@company.com
              </p>
            </div>
            <ul className="overflow-hidden">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
