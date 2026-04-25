import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaWineGlassAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { GiLoveMystery } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSun, FiMoon, FiCoffee, FiVolumeX, FiTrendingUp, FiStar, FiHeart, FiUsers } from "react-icons/fi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("userAvatar") || null
  );
  

  const navigate = useNavigate();

  // ✅ SAFE ACCOUNT PARSE (prevents crash)
  const account =
    JSON.parse(localStorage.getItem("userAccount")) || {};

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");

    if (!stored) {
      setTimeout(() => navigate("/quiz"), 800);
      return;
    }

    try {
      setProfile(JSON.parse(stored));
    } catch {
      localStorage.removeItem("userProfile");
      setTimeout(() => navigate("/quiz"), 800);
    }
  }, [navigate]);

  // ✅ Avatar handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      localStorage.setItem("userAvatar", url);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Let’s create your profile first…
        </p>
      </div>
    );
  }

  // ✅ FALLBACKS (critical for stability)
  const contact = account?.phone || "+91 98765 43210";
  const address = account?.address || "Anand, Gujarat, India";
  const desiredPlaces =
    profile?.desiredPlaces || ["Goa", "Manali", "Udaipur"];

  return (
    <div className="bg-cream pt-28 pb-20 min-h-screen px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT PANEL */}
<div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col gap-5">

  <h2 className="text-xl font-heading">
    Your Profile
  </h2>

  {/* AVATAR */}
  <div className="flex flex-col items-center text-center">
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xl font-bold text-white">
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="bg-olive w-full h-full flex items-center justify-center">
            {account?.firstName
              ? account.firstName[0].toUpperCase()
              : "U"}
          </span>
        )}
      </div>

      <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
        <FiUpload size={14} />
        <input
          type="file"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </label>
    </div>
  </div>

  {/* ✅ INFO BOX (NEW CLEAN UI) */}
  <div className="bg-cream rounded-2xl p-4 space-y-3 text-sm">

    <div className="flex items-center gap-2">
      <FiUser />
      <p className="font-medium">
        {account?.firstName || "User"} {account?.lastName || ""}
      </p>
    </div>

    <div className="flex items-center gap-2 text-gray-600">
      <FiMail/>
      <p>{account?.email || "user@email.com"}</p>
    </div>

    <div className="flex items-center gap-2 text-gray-600">
      <FiPhone/>
      <p>{contact}</p>
    </div>

    <div className="flex items-center gap-2 text-gray-600">
      <FiMapPin/>
      <p>{address}</p>
    </div>
  </div>

  {/* DESIRED PLACES */}
  <div>
    <p className="text-xs text-gray-500 mb-1">
      Desired Places
    </p>
    <div className="flex flex-wrap gap-2">
      {desiredPlaces.map((place, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-cream rounded-full text-xs"
        >
          {place}
        </span>
      ))}
    </div>
  </div>

  {/* VIBE SUMMARY (IMPROVED LOOK) */}
  <div className="border-t pt-4 space-y-3 text-sm">

    <div>
      <p className="text-gray-500 text-xs mb-1">Categories</p>
      <div className="flex flex-wrap gap-2">
        {(profile?.categories || []).map((item, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-cream rounded-full text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    <div>
      <p className="text-gray-500 text-xs mb-1">Vibes</p>
      <div className="flex flex-wrap gap-2">
        {Object.values(profile?.vibes || {})
          .flat()
          .map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-magenta text-white rounded-full text-xs"
            >
              {item}
            </span>
          ))}
      </div>
    </div>
  </div>

  <button
    onClick={() => navigate("/quiz")}
    className="mt-auto w-full bg-olive text-white py-2 rounded-lg"
  >
    Edit Preferences
  </button>
</div>

        {/* 🔹 MIDDLE PANEL */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <h3 className="font-heading mb-4">
            Preferences
          </h3>

          <div className="grid grid-cols-2 gap-6">

            {/* Categories */}
            <div>
              <p className="text-body font-medium mb-2 text-gray-600">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {(profile?.categories || []).map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-cream rounded-full text-sm"
                  >
                    <CategoryIcon item={item} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Vibes */}
            <div>
              <p className="text-body font-medium mb-2 text-gray-600">
                Vibes
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(profile?.vibes || {})
                  .flat()
                  .map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 px-3 py-1 bg-magenta text-white rounded-full text-sm"
                    >
                      <VibeIcon item={item} />
                      {item}
                    </span>
                  ))}
              </div>
            </div>

          </div>

          {/* Suggestions */}
          <div className="mt-6">
            <p className="text-body font-medium mb-3">
              Based on your vibe
            </p>

            <div className="space-y-3">
              <PreviewCard name="The Terrace Café" tag="Romantic • Upscale" />
              <PreviewCard name="Skyline Lounge" tag="Bars • Night Vibe" />
              <PreviewCard name="Urban Spice Kitchen" tag="Local • Authentic • Cozy" />
            </div>
          </div>
        </div>

        {/* 🔹 RIGHT PANEL (FROM FILE 2) */}
        <div className="flex flex-col gap-6 h-full">

          {/* DIET */}
          <div className="bg-white p-6 rounded-3xl shadow-sm flex-1">
            <h3 className="font-heading mb-4">
              Preferred Dietary Limitations
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-body font-medium mb-2 text-gray-600">
                  Lifestyle
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {profile?.diet?.map((d, i) => (
                    <span key={i} className="px-3 py-1 bg-cream rounded">
                      {d}
                    </span>
                  ))}
                </div>

                <select className="w-full border rounded px-2 py-1 text-sm">
                  <option>Select</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Keto</option>
                  <option>Pescatarian</option>
                  <option>Jain</option>
                </select>
              </div>

              <div>
                <p className="text-body font-medium mb-2 text-gray-600">
                  Food Sensitivities
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-cream rounded">
                    Nuts
                  </span>
                </div>

                <select className="w-full border rounded px-2 py-1 text-sm">
                  <option>Select</option>
                  <option>Gluten</option>
                  <option>Dairy</option>
                  <option>Soy</option>
                </select>
              </div>
            </div>
          </div>

          {/* RECOMMENDATION */}
          <div className="bg-white p-6 rounded-3xl shadow-sm flex-1">
            <h3 className="font-heading mb-4">
              Recommendation Preferences
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Highly Rated",
                "Hidden Gems",
                "Value Picks",
                "Ambiance",
                "Proximity",
                "Local Favorites",
                "Trending Now",
                "Quick Bites"
              ].map((item) => {
                const selected =
                  profile?.priorities?.includes(item);

                return (
                  <div
                    key={item}
                    className={`p-4 rounded-xl border
                      ${selected
                        ? "bg-cream border-magenta"
                        : "bg-cream-5 opacity-60"}`}
                  >
                    <p className="font-medium text-sm">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */

function PreviewCard({ name, tag }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-cream rounded-xl">
      <div className="w-14 h-14 bg-gray-300 rounded-xl" />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{tag}</p>
      </div>
    </div>
  );
}

function CategoryIcon({ item }) {
  return item === "Bars"
    ? <FaWineGlassAlt size={12} />
    : <FaUtensils size={12} />;
}

function VibeIcon({ item }) {
  const iconMap = {
    Romantic: <FiHeart size={12} />,
    Family: <FiUsers size={12} />,
    Quiet: <FiVolumeX size={12} />,
    quite: <FiVolumeX size={12} />,
    Trendy: <FiTrendingUp size={12} />,
    Upscale: <FiStar size={12} />,
    Casual: <FiMoon size={12} />,
  };

  return iconMap[item] || <IoSparkles size={12} />;
}