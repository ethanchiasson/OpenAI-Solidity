import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const SetLang: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedLang, setSelectedLand] = useState(null)

  const languages = [
    {
      title: "Solidity",
      icon: "",
    },
    {
      title: "Rust (Solana)",
      icon: "",
    },
    {
      title: "Rust (NEAR)",
      icon: "",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Choose a Language</h1>
      {languages.map((lang, i) => (
        <div className="form-control w-full">
          <label className="label cursor-pointer">
          <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-primary-500"
            />
            <span className="label-text ml-3">{lang.title}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default SetLang;
