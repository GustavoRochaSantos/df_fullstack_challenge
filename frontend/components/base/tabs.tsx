"use client";
import { Gear } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

type Content = string | React.ReactNode | React.ReactNode[];

interface Params {
  tabs: {
    title: string;
    content: Content;
  }[];
}

const Tabs = ({ tabs }: Params) => {
  const [tabContent, setTabContent] = useState<Content>(tabs[0].content);
  const [activatedTab, setActivatedTab] = useState(tabs[0].title);

  const handleTabClick = (title: string) => {
    setActivatedTab(title);
    const activeData = tabs.filter((tab) => tab.title === title);

    setTabContent(activeData[0].content);
  };

  return (
    <div className="tabWrapper">
      <div className="tabTitleWrapper">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={`tabTitle `}
            onClick={() => handleTabClick(tab.title)}
          >
            <span
              className={`p-2 ${activatedTab === tab.title && "tabActive"}`}
            >
              {tab.title}
            </span>
          </div>
        ))}
        <span className="px-3">
          <Gear size={18} />
        </span>
      </div>
      <div className="tabContent">{tabContent}</div>
    </div>
  );
};

export default Tabs;
