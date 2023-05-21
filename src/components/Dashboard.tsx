import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const cards = [
    {
      title: "Build",
      emoji: "🏰",
      link: "/build",
      content: "Build smart contracts by leveraging an AI trained for safety.",
    },
    {
      title: "Audit",
      emoji: "🔮",
      link: "/audit",
      content: "Leverage AI tools to find bugs and exploits in your contracts.",
    },
    {
      title: "Fortify",
      emoji: "🛡",
      link: "/fortify",
      content: "Get suggestions on how best to protect your smart contracts.",
    },
    {
      title: "Optimize",
      emoji: "🧮",
      link: "/optimize",
      content:
        "Go beyond defense and build faster, more lightweight contracts.",
    },
  ];

  return (
    <div className="mt-10 grid gap-3 md:grid-rows-2 lg:grid-cols-2">
      {cards.map((card) => (
        <Link href={card.link}>
            <div className="card m-2 w-96 rounded-md bg-base-300 shadow-xl">
          <p className="relative left-8 top-5 text-3xl">{card.emoji}</p>
          <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
            <p>{card.content}</p>
          </div>
        </div>
        </Link>
    
      ))}
    </div>
  );
};

export default Dashboard;
