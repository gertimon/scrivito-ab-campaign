# Scrivito AB Campaign

### Description
A Widget and ObjClasses to model easy AB Tests.

### Installation
`npm install --save gertimon/scrivito-ab-campaign`

### Usage
First you need to load all ObjClasses and Widgets.

Add in your index.js:
```jsx
import { initialize } from "scrivito-ab-testing";

initialize();
```

After this you need to ad the CampaignProvider

Import `CampaignProvider` in your App.js and add it arround the render of the currentPage:
```jsx
import { CampaignProvider } from "scrivito-ab-testing";

<CampaignProvider>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

Now you can add an CampaignWidget on your Page.

If you want to handle Campaigns in the ContentBrowser then you can add the filters to your configuration:
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
You can add your own function how the group selection is done in the `CampaignProvider`
```jsx
<CampaignProvider chooseTestGroup={(campaignTitle, tests) => {...}}>
  <Scrivito.CurrentPage />
</CampaignProvider>
```

**CampaignTitle**: The Title of the Campaign that is also used as identifier inside the local storage.
**tests**: Is the List of all tests that are referenced by the campaign.

### Further Notes
If you want to use the store data you can use the hook `useCampaign`. This provides the following functions:

```jsx
import { useCampaign } from 'scrivito-ab-testing';

const { selectedCampaigns, chooseRandomeCampaignFor } = useCampaign();

// assuming a variable campaign that is a ABCampaign objClass.
const campaignTitle = campaign.get("title");
console.log(selectedCampaigns[campaignTitle]);

const campaigtTestGroupTitle = chooseRandomeCampaignFor(campaignTitle, campaign.get("tests"));
```

**selectedCampaigns**: Is an object that contains all campaigns that where defined for the user. Not all active campaigns have to be defined here.

**chooseRandomeCampaignFor**: A function that can be used to choose a new campaign for a user. It returns a title of the choosen test.
