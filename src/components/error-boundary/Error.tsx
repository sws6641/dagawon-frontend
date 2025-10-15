"use client";

import { Button } from "@components/common/button";
// import * as console from "node:console";

type ErrorProps = {
  onReset?: () => void;
}

const Error = ({ onReset }: ErrorProps) => {
  return (
    <section>
      <div>일시적인 오류가 발생했습니다.</div>

      <div>
        <Button
          type="button"
          variant="default"
          size="default"
          color="neutral"
          onClick={() => console.log("홈으로 이동하기")}
        >
          홈으로 이동하기
        </Button>

        <Button
          type="button"
          variant="default"
          size="default"
          color="neutral"
          onClick={() => onReset}
        >
          새로고침
        </Button>
      </div>
    </section>
  );
};

export default Error;