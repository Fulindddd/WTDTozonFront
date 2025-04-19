export interface FeesParams {
  pLevel: number;
  weight: number | null;
  width: number | null;
  length: number | null;
  height: number | null;
}
export type FeesType = 'extraSmall' | 'small' | 'budget' | 'big' | 'premiumSmall' | 'premiumBig';
export interface CommissionParams {
  pLevel: number;
}
export type LogisticsTimeType = 'express' | 'standard' | 'economy';
