import React, {useState} from "react";
import * as Scrivito from "scrivito";
import "./ABCampaignTab.scss";

export const AllTestsTabComponent = ({ tests }) => {
  const [activeTab, setActiveTab] = useState(0);

  const TabNav = () => (<ul className="ABCampaignTab">
    {
      tests.map((test, index) =>
        <li
          key={index}
          className={`ABCampaignTabItem ${activeTab === index ? "--active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {test.get("title")}
        </li>
      )
    }
  </ul>);

  const TabContent = () => (
    <div className="ABCampaignContent">
      {tests.map((test, index) => (
        <div
          key={index}
          className={`ABCampaignContentItem ${activeTab === index ? "--active" : ""}`}
        >
          <Scrivito.ContentTag content={test} attribute="content"/>
        </div>
      ))}
    </div>
  )

  return <><TabNav /><TabContent /></>;
};
