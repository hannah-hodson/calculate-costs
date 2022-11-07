import { TMoneySavingBundle } from '@protoplan/types';


interface IEnforcableProps
{
  bundleSavings: TMoneySavingBundle[] | null,
  price: number,
  baseTax?: number,
  taxPercent?: number,
  deliveryPrice?: number,
  amount: number,
  amountUnit: string,
  scrapeTime?: Date | null,
  basketLimit?: number | null
}

export function enforceProtocolTypes<T>(rows: (T & IEnforcableProps)[])
{
  return rows.map(r => ({
    ...r,
    bundleSavings: r.bundleSavings?.map(s => ({
      ...s,
      scrapeTime: s.scrapeTime ?new Date(s.scrapeTime) : s.scrapeTime  })) || null,
    price: Number(r.price),
    baseTax: r.baseTax !== undefined ? Number(r.baseTax) : undefined,
    taxPercent: r.taxPercent !== undefined ? Number(r.taxPercent) : undefined,
    deliveryPrice: r.deliveryPrice !== undefined ? Number(r.deliveryPrice) : undefined,
    amount: Number(r.amount),
    amountUnit: String(r.amountUnit),
    scrapeTime: r.scrapeTime ? new Date(r.scrapeTime) : r.scrapeTime,
    basketLimit: r.basketLimit ? Number(r.basketLimit) : r.basketLimit }));
}


export function enforceListingTypes<T>(listings: (T & IEnforcableProps & { priceWithTax: number })[])
{
  return enforceProtocolTypes(listings).map(l => ({
    ...l,
    priceWithTax: Number(l.priceWithTax) }));
}
