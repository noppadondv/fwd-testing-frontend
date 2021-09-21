export interface Response {
  benefitTable: BenefitTable[];
  deathBenefitList: DeathBenefitList[];
  survivalBenefitList: SurvivalBenefitList[];
  dividendBenefitList: any[];
  otherBenefitList: any[];
  modalRatesList: ModalRatesList[];
  quotationProductList: QuotationProductList[];
}

export interface QuotationProductList {
  productId: string;
  productTypeCd: string;
  productFamilyCd: string;
  baseSumAssured: number;
  baseAnnualPremium: number;
  productTerm: number;
  premiumPayingTerm: number;
  paymentFrequencyCd: string;
  planCode: string;
  selected: boolean;
}

export interface ModalRatesList {
  paymentFrequencyCd: string;
  modalPremium: number;
  annualizedModalPremium: number;
}

export interface SurvivalBenefitList {
  sortOrder: number;
  benefitCd: string;
  benefitDesc: string;
  benefitValue: number;
  benefitSuffix: string;
}

export interface DeathBenefitList {
  sortOrder: number;
  benefitCd: string;
  benefitDesc: string;
  benefitValue?: number;
  benefitSuffix?: string;
}

export interface BenefitTable {
  benefitAmount?: number;
  maturity?: number;
  premiumReceived?: number;
  totalIcpAmount?: number;
  icprate?: number;
  icpAmount?: number;
  policyYear?: number;
  maturityValue?: number;
  icp?: number;
  accumulatedPremium?: number;
  cvAmount?: number;
  accumulatedTotalIcpAmount?: number;
  attainedAge?: number;
}
