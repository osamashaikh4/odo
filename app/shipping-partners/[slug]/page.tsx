import React from "react";
import PartnerDetails from "@/components/shipping-partners/PartnerDetails";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string };
};

export default async function page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { connectionID } = await searchParams;
  return <PartnerDetails id={slug} connectionID={connectionID} />;
}
