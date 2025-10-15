"use client";

import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Fallback } from "@components/error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type CustomErrorBoundaryProps = {
  element: ReactNode;
}

const CustomErrorBoundary = ({ element }: CustomErrorBoundaryProps) => {
  const pathname = usePathname();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      key={pathname}
      FallbackComponent={Fallback}
      onReset={reset}
    >
      <Suspense
        // TODO: 로딩 컴포넌트 추가 필요
        // fallback={<Loading />}
      >
        {element}
      </Suspense>
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
