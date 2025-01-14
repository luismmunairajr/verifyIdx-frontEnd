
const nodes = [
  {
    id: 'address',
    iconName:"MapPin",
    title: 'Address Lookup',
    description: 'Ensure the location provided is real and associated with the individual.',
  },
  {
    id: 'kyc',
    iconName: "ShieldCheck",
    title: 'KYC/AML',
    description: 'Verify customers identities and prevent illegal activities.',
  },
  {
    id: 'identity',
    iconName: "ScanEye",
    title: 'Identity Verification',
    description: 'Confirm that an individuals identity is authentic by verifying documents.',
  },
  {
    id: 'government',
    iconName: "Building",
    title: 'Government Screening',
    description: 'Checking individuals against government or restricted.',
  },{
    id: 'digital',
    iconName: "Signature",
    title: 'Digital Signature',
    description: 'Authenticate digital documents and transactions, ensuring legal validity.',
  },{
    id: 'deceased',
    iconName: "Skull",
    title: 'Deceased API',
    description: 'Checks whether a person is registered as deceased in reliable databases.',
  }
];

export default nodes;
