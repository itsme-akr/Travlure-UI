import { FiMessageCircle, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import { FaStar, FaRegCompass, FaHeart } from "react-icons/fa";

export default function ExploreMore() {
  const tiles = [
    {
      title: "Hidden Gems",
      img: "https://images.unsplash.com/photo-1542309174-d33b34ce6ea7",
      icon: <FaRegCompass className="text-[#c9a44c]" />,
    },
    {
      title: "Top Rated",
      img: "https://images.unsplash.com/photo-1550293750-dde2bed30d54",
      icon: <FaStar className="text-[#c9a44c]" />,
    },
    {
      title: "Nearby You",
      img: "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1",
      icon: <FiMapPin className="text-[#c9a44c]" />,
    },
    {
      title: "Weekend Picks",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      icon: <FiCalendar className="text-[#c9a44c]" />,
    },
  ];

  return (
    <div className="border-t">

      {/* Explore Section */}
      <div className="bg-[#f4ede2] py-14 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Heading LEFT aligned */}
          <div className="mb-10">
            <h2 className="text-2xl font-heading">Explore More</h2>
            <div className="w-[70px] h-[3px] bg-[#c9a44c] mt-2"></div>
          </div>

          {/* Taller Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tiles.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transform hover:scale-105 transition duration-300 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-4 flex items-center justify-center gap-2">
                  {t.icon}
                  <p className="font-medium text-sm">{t.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Feedback + Contact Section */}
      <div className="bg-[#f4ede2] py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Tagline */}
          <div className="flex flex-col items-center mb-6">
            <FaHeart className="text-[#c9a44c] text-lg mb-2" />
            <h3 className="text-lg font-heading">Happy to Serve You</h3>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-3 w-full max-w-sm">
              <div className="flex-1 h-[1px] bg-[#c9a44c]"></div>
              <FaStar className="text-[#c9a44c] text-xs" />
              <div className="flex-1 h-[1px] bg-[#c9a44c]"></div>
            </div>
          </div>

          {/* Compact Cards */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* Feedback */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center">
              <div className="flex justify-center mb-2">
                <FiMessageCircle className="text-magenta text-lg" />
              </div>
              <h4 className="font-heading text-sm">Feedback</h4>
              <p className="text-gray-500 text-xs mt-1">
                Help us improve your experience
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center">
              <div className="flex justify-center mb-2">
                <FiMail className="text-magenta text-lg" />
              </div>
              <h4 className="font-heading text-sm">Contact</h4>
              <p className="text-gray-500 text-xs mt-1">
                Questions or suggestions?
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-6 text-xs text-gray-500">
            © 2026 Travlure • Crafted for personalized discovery
          </div>

        </div>
      </div>

    </div>
  );
}