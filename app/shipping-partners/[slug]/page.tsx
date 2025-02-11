import React from "react";

type Props = {
  params: { slug: string };
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  return <p>{slug}</p>;
}
