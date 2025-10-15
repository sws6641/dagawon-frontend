"use client";

import { CustomErrorBoundary } from "@components/error-boundary";
import { Button } from "@components/common/button";

export default function Page() {
  const handleClick = () => {
    console.log("click!");
  }

  return (
    <div className="page">
     <CustomErrorBoundary
      element={<main />}
      />

      <Button
        variant="default"
        color="neutral"
        size="default"
        onClick={handleClick}
      >
        가이드 버튼
      </Button>

      <span className="text-primary sample-spacing sample-ring">Test Text</span>
    </div>
  );
}
