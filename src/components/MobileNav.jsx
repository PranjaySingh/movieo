import { NavLink } from "react-router-dom";
import { mobileNavigation } from "../utils/navigation";

function MobileNav() {
  return (
    <section className="lg:hidden bg-black h-14 bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {mobileNavigation.map((nav) => (
          <NavLink
            key={`Mobile navigation ${nav.label}`}
            to={nav.href}
            className={({ isActive }) =>
              `px-4 flex flex-col items-center ${isActive && "text-white"}`
            }
          >
            <div className="text-2xl">{nav.icon}</div>
            <p className="text-xs">{nav.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default MobileNav;
