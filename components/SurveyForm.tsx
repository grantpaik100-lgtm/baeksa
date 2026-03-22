import { useState } from "react";
import { saveSurvey } from "../lib/survey";

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    companions: "혼자",
    music: [],
    otherMusic: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      music: prev.music.includes(value)
        ? prev.music.filter((m) => m !== value)
        : [...prev.music, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSurvey(formData);
    alert("Survey submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 bg-gray-800"
        />
      </div>
      <div>
        <label>연락처:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="block w-full p-2 bg-gray-800"
        />
      </div>
      <div>
        <label>동반 여부:</label>
        <select
          name="companions"
          value={formData.companions}
          onChange={handleChange}
          className="block w-full p-2 bg-gray-800"
        >
          <option>혼자</option>
          <option>2인</option>
          <option>그룹</option>
        </select>
      </div>
      <div>
        <label>음악 취향:</label>
        <div>
          {["Rock", "Hip-hop", "Jazz"].map((option, idx) => (
            <label key={idx} className="block">
              <input
                type="checkbox"
                value={option}
                onChange={handleMusicChange}
                checked={formData.music.includes(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <input
          type="text"
          name="otherMusic"
          placeholder="기타"
          value={formData.otherMusic}
          onChange={handleChange}
          className="block w-full mt-2 p-2 bg-gray-800"
        />
      </div>
      <button className="block px-6 py-2 bg-blue-600 rounded-lg">Submit</button>
    </form>
  );
}