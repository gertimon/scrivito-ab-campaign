import * as React from "react";
import * as Scrivito from "scrivito";
import { useCampaign } from '../../Components/ABCampaignContext';

import { AllTestsTabComponent } from "./AllTestsTabComponent";

Scrivito.provideComponent("ABCampaignWidget", Scrivito.connect(({ widget }) => {
  const { selectedCampaigns, chooseRandomeCampaignFor } = useCampaign();
  const campaign = widget.get("campaign");

  if (!campaign) {
    return Scrivito.isInPlaceEditingActive()
      ? <div className="alert alert-warning">No campaign is selected</div>
      : null;
  }

  const tests = campaign.get("tests");
  if (!tests?.length) {
    return Scrivito.isInPlaceEditingActive()
      ? <div className="alert alert-warning">There are no tests in your campaign</div>
      : null
  }

  const campaignTitle = campaign.get("title");
  let selectedGroup = selectedCampaigns[campaignTitle];

  if (!selectedGroup) {
    selectedGroup = chooseRandomeCampaignFor(campaignTitle, tests);
  }

  const selectedTest = tests.filter(t => t.get("title") === selectedGroup );

  if (Scrivito.isInPlaceEditingActive()) {
    return <AllTestsTabComponent tests={tests} />
  }

  return <Scrivito.ContentTag content={selectedTest[0]} attribute="content" />;
}));
