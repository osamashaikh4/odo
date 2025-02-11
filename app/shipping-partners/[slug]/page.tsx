import PartnerDetails from "@/components/shipping-partners/PartnerDetails";
import React from "react";

type Props = {
  params: { slug: string };
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  return <PartnerDetails id={slug} />;
}
