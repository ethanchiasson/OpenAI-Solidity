import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const SetContext: React.FC = () => {
  const { data: sessionData } = useSession();


  return (
    <div className="flex flex-col items-center justify-center gap-4">
    <h1>Step 2</h1>
    </div>
  );
};

export default SetContext;
