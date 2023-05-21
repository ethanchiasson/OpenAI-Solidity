import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import AuthShowcase from "~/components/Auth";
import Generator from "~/components/Generator";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });


 

  return (
    <>
      <Head>
        <title>SolidityChat 💬 </title>
        <meta name="description" content="Build Stronger Smart Contracts" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        {sessionData ? (
     <>
     <div className="w-full mx-2 max-w-2xl p-4">
     <Generator/>
     </div>
     </>

        ) : (
          <>
          <div className="container flex flex-col py-16 ">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-7xl">🧪</h1>
                <h1 className="text-4xl font-bold text-white">
                 Generate Smart Contracts With Natural Language
                </h1>
                <p className="px-3 text-base-content">
                  Leverage AI to construct more secure, optimized smart
                  contracts and get an edge over attackers.
                </p>
              </div>
            </div>
          </div>
           <AuthShowcase />
           </>
        )}
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Get Started"}
//       </button>
//     </div>
//   );
// };
