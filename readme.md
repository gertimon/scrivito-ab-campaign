# Scrivito AB Campaign

### Description
A set of widgets and ObjClasses to easily model A/B tests.

### Installation
Run the following command to install:
```bash
npm install --save gertimon/scrivito-ab-campaign
```

### Usage
First, you need to load all ObjClasses and Widgets.

In your index.js:
```jsx
import { initialize } from "scrivito-ab-testing";

initialize();
```

Next, add the `CampaignProvider`.

In your `App.js`, import `CampaignProvider` and wrap it around the rendering of the currentPage:
```jsx
import { CampaignProvider } from "scrivito-ab-testing";

<CampaignProvider>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

Now you can add an `CampaignWidget` on your Page.

If you'd like to manage campaigns in the `ContentBrowser`, you can add filters to your configuration:
```jsx
import { contentBrowserOptions } from "scrivito-ab-testing";

_objClasses: {
  options: {
    ...contentBrowserOptions,
    // your Filters here
  }
}
```

### Options
You can define how the test group selection is done by adding a function to the `CampaignProvider`:

```jsx
<CampaignProvider chooseTestGroup={(campaign) => {...}}>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

**Campaign**: The campaign you want to choose the test group for.
**tests**: The list of all tests associated with the campaign.

You can also track user interactions by adding a `trackInteraction` function to the `CampaignProvider`:

```jsx
<CampaignProvider trackInteraction={(campaign, selectedTest) => {...}}>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

**Campaign**: The campaign object passed by the hook function.
**selectedTest**: The test group object the user was assigned to.

### Further Notes
To use the stored campaign data, you can utilize the `useCampaign` hook, which provides the following functions:

```jsx
import { useCampaign } from 'scrivito-ab-testing';

const {
  selectedCampaigns,
  chooseRandomeCampaignFor,
  trackInteractionFor,
  actualCampaign
} = useCampaign();

// assuming a variable campaign that is a ABCampaign objClass.
const campaignTitle = campaign.get("title");
console.log(selectedCampaigns[campaignTitle]);

const campaigtTestGroupTitle = chooseRandomeCampaignFor(campaign);

trackInteractionFor(campaign);
actualCampaign(widget);
```

**selectedCampaigns**: An object containing all campaigns defined for the user. Not all active campaigns will necessarily be included.

**chooseRandomeCampaignFor**: A function to assign a new test group to a user. It returns the title of the selected test. It returns null if no campaign or a campaign with zero ab tests is given. Otherwise it returns the title of the selected test.

**trackInteractionFor**: A function that uses the `trackInteraction` function defined in the `CampaignProvider`.

**actualCampaign**: A function to get the actual campaign from any widget inside the content of a test group or default content of a campaign.

### How To Track

To Track the different test groups you can use the `trackInteractionFor` function from the useCampaign hook.

Setup the tracking funtion inside your Provider.
```jsx
<CampaignProvider trackInteraction={(campaign, selectedTest) => {
  const campaignTitle = campaign.get("title");
  const trackingInformation = campaign.get("trackingInformation");
  const testGroupTitle = selectedTest.get("title");
  const targetingrules = selectedTest.get("targetingrules");

  // here goes your tracking code
}}>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

Then call the hook inside a widget:
```jsx
import React from "react";
import * as Scrivito from "scrivito";
import { useCampaign } from 'scrivito-ab-testing';

Scrivito.provideComponent("CallToActionWidget", Scrivito.connect({ widget }) =>{
  const { trackInteractionFor, actualCampaign } = useCampaign();
  const campaign = actualCampaign(widget);

  return (
    <button
      className="btn btn-primary"
      onClick={async () => {
        await trackInteractionFor(campaign);
        Scrivito.navigateTo(widget.get("destination"));
      }}
    >
      Click Me
    </button>
});
```
