import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GetSessionParams, getSession, signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { IoAnalytics, IoFlash, IoLeaf, IoSparklesSharp, IoTrophy } from "react-icons/io5";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  const credits = api.user.getCredits.useQuery(undefined, {});
  const exp = api.user.getUserExp.useQuery(undefined, {});
  const level = api.user.getUserLevel.useQuery(undefined, {});

  return (
    <>
      <Head>
        <title>Stake Chatbot</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-5 flex justify-center ">
        <div className="flex max-w-5xl flex-col items-center">
          <div className="stats stats-vertical bg-base-300 shadow lg:stats-horizontal">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="online avatar">
                  <div className="w-16 rounded-full">
                    <img src={sessionData?.user.image?.toString()} />
                  </div>
                </div>
              </div>
              <div className="stat-value">{sessionData?.user.name}</div>
              <div className="stat-title">{sessionData?.user.email}</div>
              <div className="stat-desc text-secondary">
                {/* {credits.data} credits */}
                {sessionData?.user.id}
              </div>
            </div>
            <div className="align-center stat ">
              <div className="stat-figure text-secondary">
                <IoSparklesSharp size={25} />
              </div>
              <div className="stat-title">Credits</div>
              <div className="stat-value text-secondary"> {credits.data}</div>
              <div className="stat-desc"></div>
            </div>
            <div className="align-center stat">
              <div className="stat-figure text-secondary">
                <IoAnalytics size={25} />
              </div>
              <div className="stat-title">Level</div>
              <div className="stat-value text-secondary"> {level.data}</div>
              <div className="stat-desc"></div>
            </div>
            <div className="align-center stat">
              <div className="stat-figure text-secondary">
                <IoFlash size={25} />
              </div>
              <div className="stat-title">Exp</div>
              <div className="stat-value text-secondary"> {exp.data}</div>
              <div className="stat-desc"></div>
            </div>
         
          </div>
          
          <div className="mt-7 w-full">
         {/*  */}
         <div className="stats stats-vertical bg-base-300 shadow lg:stats-horizontal">
         <div className="align-center stat">
              <div className="stat-figure text-secondary">
                <IoTrophy size={25} />
              </div>
              <div className="stat-title">Acheivements</div>
              <div className="stat-value text-secondary"> {(exp.data!)/100}</div>
              <div className="stat-desc"></div>
            </div>
         </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;
