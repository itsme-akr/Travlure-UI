import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizTile from "../components/QuizTile";
import {
  LuUtensils,
  LuCoffee,
  LuWine,
  LuMapPin,
  LuHeart,
  LuUsers,
  LuMoon,
  LuSparkles,
  LuSmile,
} from "react-icons/lu";

export default function ProfileQuiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    categories: [],
    vibes: {
      Restaurants: [],
      Bars: [],
      Cafes: [],
      Cultural: [],
    },
    diet: [],
    priorities: [],
  });

  // 🔥 Toggle helper
  const toggle = (value, key, limit = null) => {
    const current = answers[key];

    if (current.includes(value)) {
      setAnswers({
        ...answers,
        [key]: current.filter((v) => v !== value),
      });
    } else {
      if (!limit || current.length < limit) {
        setAnswers({
          ...answers,
          [key]: [...current, value],
        });
      }
    }
  };

  const next = () => setStep(step + 1);
  const skip = () => next();
  const categories = [
  { name: "Restaurants", icon: <LuUtensils /> },
  { name: "Bars", icon: <LuWine /> },
  { name: "Cafes", icon: <LuCoffee /> },
  { name: "Cultural", icon: <LuMapPin /> },
];
  const vibes = [
  { label: "Romantic", icon: <LuHeart /> },
  { label: "Family", icon: <LuUsers /> },
  { label: "Quiet", icon: <LuMoon /> },
  { label: "Trendy", icon: <LuSparkles /> },
  { label: "Upscale", icon: <LuSparkles /> },
  { label: "Casual", icon: <LuSmile /> },
];



  const finish = () => {
    localStorage.setItem("userProfile", JSON.stringify(answers));
    alert("Profile Saved Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">

      <div className="bg-[FAF6F0] p-8 rounded-3xl shadow-xl w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="font-heading text-2xl mb-2">
          Let’s start personalizing your profile
        </h1>

        <p className="text-gray-600 font-medium mb-6">
          Step {step} of 4
        </p>

        {/* SKIP */}
        <button onClick={skip} className="text-sm text-magenta mb-4">
          Skip →
        </button>

        {/* Q1 */}
        {step === 1 && (
          <>
            <h2 className="font-semibold mb-4">
              Which of these attractions do you enjoy?
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((item) => (
                <QuizTile
                  key={item.name}
                  label={item.name}
                  icon={item.icon}
                  selected={answers.categories.includes(item.name)}
                  onClick={() => toggle(item.name, "categories", 3)}
                />
              ))}
            </div>
          </>
        )}

        {/* Q2 */}
{step === 2 && (
  <>
    <h2 className="font-heading text-xl mb-2">
      Typically what type of vibe do you like?
    </h2>

    <p className="text-sm text-magenta mb-4 font-medium">
      Choose your top 3 for each category
    </p>

    <div className="space-y-6 mt-4 pb-4">

      {categories
        .filter((cat) => answers.categories.includes(cat.name))
        .map((cat) => {
          const selected = answers.vibes?.[cat.name] || [];

          return (
            <div key={cat.name} className="bg-[#EFE6D8] p-4 rounded-xl">

              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="font-medium text-sm">{cat.name}</h3>
              </div>

              {/* Vibes */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">

                {vibes.map((vibe) => {
                  const isSelected = selected.includes(vibe.label);
                  const isDisabled =
                    !isSelected && selected.length >= 3;

                  return (
                    <div
                      key={vibe.label}
                      onClick={() => {
                        if (isDisabled) return;

                        const updated = isSelected
                          ? selected.filter((v) => v !== vibe.label)
                          : [...selected, vibe.label];

                        setAnswers((prev) => ({
                          ...prev,
                          vibes: {
                            ...prev.vibes,
                            [cat.name]: updated,
                          },
                        }));
                      }}
                      className={`cursor-pointer flex flex-col items-center gap-2 p-2.5 rounded-xl transition
                        ${
                          isSelected
                            ? "bg-magenta text-white"
                            : "bg-[#FAF6F0] border border-gray-200/50 hover:border-magenta shadow-sm"
                        }
                        ${isDisabled ? "opacity-40" : ""}
                      `}
                    >

                      <div className="w-9 h-9 flex items-center justify-center rounded-md bg-cream">
                        {vibe.icon}
                      </div>

                      <span className="text-xs font-medium text-center">
                        {vibe.label}
                      </span>

                    </div>
                  );
                })}

              </div>
            </div>
          );
        })}

    </div>
  </>
)}

        {/* Q3 (Conditional) */}
        {step === 3 && (
          <>
            <h2 className="font-semibold mb-4">
              Any dietary preferences?
            </h2>

            <select
              multiple
              className="w-full border rounded-lg p-2 mb-4"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  diet: [...e.target.selectedOptions].map((o) => o.value),
                })
              }
            >
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Jain</option>
              <option>Gluten-Free</option>
            </select>
          </>
        )}

        {/* Q4 */}
        {step === 4 && (
          <>
            <h2 className="font-semibold mb-4">
              What matters most?
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Highly Rated",
                "Hidden Gems",
                "Value Picks",
                "Ambiance",
                "Proximity",
                "Local Favorites",
              ].map((p) => (
                <QuizTile
                  key={p}
                  label={p}
                  icon="⭐"
                  selected={answers.priorities.includes(p)}
                  onClick={() => toggle(p, "priorities")}
                />
              ))}
            </div>
          </>
        )}

        {/* NAV */}
        <div className="flex justify-between mt-6">
          {step < 4 ? (
            <button
              onClick={next}
              className="bg-olive text-white px-4 py-2 rounded-lg"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={finish}
              className="bg-magenta text-white px-4 py-2 rounded-lg"
              
            >
              Finish
            </button>
          )}
        </div>

      </div>
    </div>
  );
}