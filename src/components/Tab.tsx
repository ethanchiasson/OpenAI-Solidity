import { title } from "process";
import { useState } from "react";

type Tab = {
  title: String;
  content: any;
};

interface Tabs {
  tabs: Tab[];
}

export const Tabs = ({ tabs }: Tabs) => {
  const [activeTab, setActiveTab] = useState<Tab | undefined>(tabs[0]);
  const changeActiveTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs tabs-boxed p-2">
      {tabs.map((tab: Tab) => (
        <a
          className={`tab ${
            activeTab?.title === tab.title ? "tab-active" : ""
          }`}
          onClick={() => changeActiveTab(tab)}
        >
          {tab.title}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
