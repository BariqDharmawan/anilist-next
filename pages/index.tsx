import Button from "@/src/components/Button";
import ClientOnly from "@/src/components/ClientOnly";
import Home from "@/src/sections/Home";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

interface Params extends ParsedUrlQuery {
  page?: string;
}

export default function HomePage() {
  const router = useRouter();
  const params = router.query as Params;

  const page = params.page !== undefined ? parseInt(params.page) : 1;

  return (
    <div>
      <ClientOnly>
        <Home {...{ page }} />
      </ClientOnly>
    </div>
  );
}
