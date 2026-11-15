export const projectTypes = {
  residential: "საცხოვრებელი შენობა",
  commercial: "კომერციული შენობა",
  hotel: "სასტუმრო",
  office: "ოფისი",
  retail: "საცალო სივრცე",
  other: "სხვა ობიექტი",
} as const;

export const proposalLabels = {
  name: "სახელი და გვარი",
  company: "კომპანია",
  phone: "ტელეფონი",
  email: "ელფოსტა",
  projectType: "ობიექტის ტიპი",
  location: "ობიექტის მდებარეობა",
  description: "პროექტის აღწერა",
  privacy: "თანხმობა",
} as const;
