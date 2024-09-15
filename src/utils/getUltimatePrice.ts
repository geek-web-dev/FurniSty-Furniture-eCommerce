export const getUltimatePrice = (priceInCents: number, offer: number) => {
  return offer ? priceInCents - (priceInCents / 100) * offer : priceInCents;
};
