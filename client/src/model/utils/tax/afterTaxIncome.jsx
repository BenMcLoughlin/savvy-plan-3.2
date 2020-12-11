export const afterTaxIncome = (income, federalTaxes, provincialTaxes, federalCredits, provincialCredits) => {
  return income - (federalTaxes + provincialTaxes) + federalCredits + provincialCredits;
};
