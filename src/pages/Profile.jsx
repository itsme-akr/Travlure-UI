import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");

    if (!stored) {
      // 🔥 better UX redirect delay
      setTimeout(() => {
        navigate("/quiz");
      }, 800);
      return;
    }

    try {
      setProfile(JSON.parse(stored));
    } catch (err) {
      // 🔥 fallback if corrupted storage
      localStorage.removeItem("userProfile");
      setTimeout(() => {
        navigate("/quiz");
      }, 800);
    }
  }, [navigate]);

  // 🔥 loading / redirect state UI
  if (!profile) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Let’s create your profile first…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-28 pb-20 max-w-3xl mx-auto min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow">

        <h2 className="text-xl font-heading mb-6">
          Your Preferences
        </h2>

        <Section title="Categories" data={profile?.categories || []} />

        <Section
          title="Vibes"
          data={Object.values(profile?.vibes || {}).flat()}
        />

        <Section title="Dietary" data={profile?.diet || []} />

        <Section title="Preferences" data={profile?.priorities || []} />

      </div>
    </div>
  );
}

// 🔥 safe reusable section
function Section({ title, data = [] }) {
  return (
    <div className="mb-4">
      <p className="font-medium mb-2">{title}</p>

      <div className="flex flex-wrap gap-2">
        {data.length === 0 ? (
          <span className="text-gray-400 text-sm">None</span>
        ) : (
          data.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-magenta/10 text-magenta rounded-full text-sm"
            >
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}