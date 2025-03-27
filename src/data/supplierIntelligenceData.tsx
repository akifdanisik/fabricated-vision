
import { SupplierIntelligenceData } from '@/components/suppliers/SupplierIntelligenceTable';

export const sampleSupplierIntelligenceData: SupplierIntelligenceData[] = [
  {
    id: '1',
    name: 'PharmaCorp',
    initials: 'PC',
    safety: {
      fda483Count: 0,
      emaGmpStatus: 'Valid',
      whoPrequalification: true,
      recallHistory: 0
    },
    affordability: {
      pricePerUnit: 0.35,
      priceTrend: 'stable',
      paymentTerms: 'Net 45'
    },
    reliability: {
      onTimeDelivery: 97,
      financialHealth: 'AAA',
      productionCapacity: 'High'
    },
    documents: {
      fdaEir: '/documents/pharmaco-fda.pdf',
      emaGmp: '/documents/pharmaco-gmp.pdf',
      qualityAgreement: '/documents/pharmaco-qa.pdf'
    }
  },
  {
    id: '2',
    name: 'BioTech Materials',
    initials: 'BM',
    safety: {
      fda483Count: 1,
      emaGmpStatus: 'Valid',
      whoPrequalification: true,
      recallHistory: 0
    },
    affordability: {
      pricePerUnit: 0.42,
      priceTrend: 'up',
      paymentTerms: 'Net 30'
    },
    reliability: {
      onTimeDelivery: 93,
      financialHealth: 'AA',
      productionCapacity: 'High'
    },
    documents: {
      fdaEir: '/documents/biotech-fda.pdf',
      emaGmp: '/documents/biotech-gmp.pdf',
      qualityAgreement: '/documents/biotech-qa.pdf'
    }
  },
  {
    id: '3',
    name: 'ChemSource Inc.',
    initials: 'CS',
    safety: {
      fda483Count: 0,
      emaGmpStatus: 'Valid',
      whoPrequalification: true,
      recallHistory: 0
    },
    affordability: {
      pricePerUnit: 0.38,
      priceTrend: 'down',
      paymentTerms: 'Net 60'
    },
    reliability: {
      onTimeDelivery: 95,
      financialHealth: 'A',
      productionCapacity: 'Medium'
    },
    documents: {
      emaGmp: '/documents/chemsource-gmp.pdf',
      qualityAgreement: '/documents/chemsource-qa.pdf'
    }
  },
  {
    id: '4',
    name: 'PackTech Solutions',
    initials: 'PS',
    safety: {
      fda483Count: 2,
      emaGmpStatus: 'Pending',
      whoPrequalification: false,
      recallHistory: 1
    },
    affordability: {
      pricePerUnit: 0.28,
      priceTrend: 'down',
      paymentTerms: 'Net 45'
    },
    reliability: {
      onTimeDelivery: 82,
      financialHealth: 'BBB',
      productionCapacity: 'High'
    },
    documents: {
      fdaEir: '/documents/packtech-fda.pdf'
    }
  },
  {
    id: '5',
    name: 'MedSource Inc.',
    initials: 'MI',
    safety: {
      fda483Count: 4,
      emaGmpStatus: 'Suspended',
      whoPrequalification: false,
      recallHistory: 2
    },
    affordability: {
      pricePerUnit: 0.22,
      priceTrend: 'stable',
      paymentTerms: 'Net 30'
    },
    reliability: {
      onTimeDelivery: 68,
      financialHealth: 'CCC',
      productionCapacity: 'Low'
    },
    documents: {
      fdaEir: '/documents/medsource-fda.pdf'
    }
  },
  {
    id: '6',
    name: 'MetalPack Industries',
    initials: 'MP',
    safety: {
      fda483Count: 1,
      emaGmpStatus: 'Pending',
      whoPrequalification: false,
      recallHistory: 0
    },
    affordability: {
      pricePerUnit: 0.48,
      priceTrend: 'up',
      paymentTerms: 'Net 30'
    },
    reliability: {
      onTimeDelivery: 88,
      financialHealth: 'BB',
      productionCapacity: 'Medium'
    },
    documents: {
      emaGmp: '/documents/metalpack-gmp.pdf',
      qualityAgreement: '/documents/metalpack-qa.pdf'
    }
  },
  {
    id: '7',
    name: 'BoxCo',
    initials: 'BC',
    safety: {
      fda483Count: 0,
      emaGmpStatus: 'Valid',
      whoPrequalification: true,
      recallHistory: 0
    },
    affordability: {
      pricePerUnit: 0.45,
      priceTrend: 'down',
      paymentTerms: 'Net 60'
    },
    reliability: {
      onTimeDelivery: 92,
      financialHealth: 'A',
      productionCapacity: 'Medium'
    },
    documents: {
      fdaEir: '/documents/boxco-fda.pdf',
      emaGmp: '/documents/boxco-gmp.pdf',
      qualityAgreement: '/documents/boxco-qa.pdf'
    }
  },
];
