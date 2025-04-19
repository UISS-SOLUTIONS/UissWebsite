export const dynamic = "force-dynamic";

import React from "react";
import WebLayout from "./(pages)/layout";
import Index from "./(pages)/Home/Index";

function Home() {
  return (
    <WebLayout>
      <Index/>
    </WebLayout>
  );
}

export default Home;
