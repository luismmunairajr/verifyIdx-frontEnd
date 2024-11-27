export type Person = {
  name: string
  status: string
  image: string
  details?: {
    firstName: string
    lastName: string
    fullName?: string
    bi: string
    height: string
    issuedBI: string
    dateOfBirth: string
    sex: string
    maritalStatus: string
    fatherName: string
    motherName: string
    placeOfBirth: string
    issuanceDateBI: string
    expiryDateBI: string
    address: string
  }
  screening?:{
    entryDate: string
    name: string
    alias: string
    alternativeSpeling: string
    pep?: {
      position: string
      period: string
      riskCaregory:string
      country: string
    },
    sanction: string
    ageData:string
    DOB: string
    deceased: string
    details: string
    locations: string
  };
  address?:{
    locations: string
    countries: string
  }
};
