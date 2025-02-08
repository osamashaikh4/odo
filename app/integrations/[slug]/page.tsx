import React from "react";
import IntegrationDetails from "@/components/integrations/IntegrationDetails";

type Props = {
  params: { slug: string };
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  return <IntegrationDetails id={slug} />;
}
