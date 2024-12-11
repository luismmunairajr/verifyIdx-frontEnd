import React from 'react';
import { ScanEye, Fingerprint, Sparkles, List } from 'lucide-react';

const nodes = [
  {
    id: 'identity',
    icon: <ScanEye size={40} />,
    title: 'Identity Verification',
    description: 'Confirms identity using biometric and document checks to prevent fraud. ',
  },
  {
    id: 'signature',
    icon: <Fingerprint size={40} />,
    title: 'Digital Signature',
    description: 'Authenticates documents securely, ensuring integrity and trust.',
  },
  {
    id: 'assistant',
    icon: <Sparkles size={40} />,
    title: 'AI Assistant',
    description: 'Provides smart insights and recommendations using AI.',
  },
  {
    id: 'watchlist',
    icon: <List size={40} />,
    title: 'Watchlist',
    description: 'Monitors entities in real-time for compliance and risk control.',
  },
];

export default nodes;
