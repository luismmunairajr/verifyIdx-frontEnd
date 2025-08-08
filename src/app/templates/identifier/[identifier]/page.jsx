
'use client';

import TemplatePageContent from './identifier';

export default function TemplatePage({ params }) {
  return <TemplatePageContent id={params.identifier} />;
}
