export const campaignTitle = (campaign) => {
  if (!campaign) return null;
  return `${campaign.get("title")}-${campaign.id()}`;
}
