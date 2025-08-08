
'use client';

import TemplatePageContent from './Templates';

export default function TemplatePage({ params }) {
  return <TemplatePageContent id={params.id} />;
}
