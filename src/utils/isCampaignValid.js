export const isCampaignValid = (campaign) => {
  const validFrom = campaign.get("validFrom");
  const validUntil = campaign.get("validUntil");
  const now = new Date();
  return (validFrom <= now) && (validUntil >= now);
}
