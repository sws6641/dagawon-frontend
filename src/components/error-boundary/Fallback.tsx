import { Error } from "@components/error-boundary";
import { FallbackProps } from "react-error-boundary";

const Fallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Error onReset={resetErrorBoundary} />
  );
};

export default Fallback;
