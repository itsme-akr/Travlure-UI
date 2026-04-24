import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <div
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Travlure"
            className="w-8 h-8 object-contain"
          />
          <span className="font-heading text-lg tracking-wide">
            Travlure
          </span>
        </div>

        {/* Links */}
        <div className=" pb-20 md:pb-0 hidden md:flex gap-8 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/places"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            My Places
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            Profile
          </NavLink>

          <NavLink
          to="/settings" 
          className={({isActive}) =>
            isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
        }
          >
            Settings</NavLink>

        </div>

        {/* CTA */}
        <button className="bg-olive px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-gold transition shadow-sm">
          Log In
        </button>

      </div>
    </div>
  );
}