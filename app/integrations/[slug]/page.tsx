import React from "react";
import IntegrationDetails from "@/components/integrations/IntegrationDetails";

type Props = {
  params: { slug: string };
};

export default function page({ params }: Props) {
  return <IntegrationDetails id={params.slug} />;
}
