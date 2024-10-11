import * as React from "react";
import * as Scrivito from "scrivito";
import { useCampaign } from '../../Components/ABCampaignContext';
import { isCampaignValid } from "../../utils/isCampaignValid";

import { AllTestsTabComponent } from "./AllTestsTabComponent";

Scrivito.provideComponent("ABCampaignWidget", Scrivito.connect(({ widget }) => {
  const { selectedCampaigns, chooseRandomeCampaignFor } = useCampaign();
  const campaign = widget.get("campaign");

  // no campaign set
  if (!campaign) {
    return Scrivito.isInPlaceEditingActive()
      ? <div className="alert alert-warning">No campaign is selected</div>
      : null;
  }

  // check if campaign is inside validFrom and validUntil
  if (isCampaignValid(campaign)) {
    return <Scrivito.ContentTag content={campaign} attribute="defaultContent" />;
  }

  // check if campaign has testgroups
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
