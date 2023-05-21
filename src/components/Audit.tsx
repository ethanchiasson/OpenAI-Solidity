import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SetLang from "./SetLang";
import SetContext from "./SetContext";
import Generator from "./Generator";

const Audit: React.FC = () => {
  const { data: sessionData } = useSession();
  
  return (
    <div className="w-3/4 flex flex-col justify-center gap-4 bg-base-200 p-3 rounded">
      <Generator/>
    </div>
  );
};

export default Audit;
