import axios from "axios";

export const axiosBasicInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// 요청 인터셉터
axiosBasicInstance.interceptors.request.use(
  // 요청 전 작업: 토큰 주입 등
  function(config) {
    const copyConfig = { ...config };
    if (!config.headers) return config;
    // 스토리지에서 토큰가져오기
    const accessToken = sessionStorage.getItem("auth");

    if (accessToken) {
      const parsedAuth = JSON.parse(accessToken);
      if (parsedAuth && config.headers) {
        // access token을 header에 담아 요청
        copyConfig.headers.Authorization = `Bearer ${parsedAuth.accessToken}`;
      }
    } else {
      // accessToken 토큰이 없다면 헤더 제거 (401 에러시)
      delete config.headers["Authorization"];
    }

    return config;
  },
  function(error) {
    // 요청 오류 시 작업
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosBasicInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // 응답 오류 시 작업
    if (error.response && error.response.status) {
      console.log(error.response);

      switch (error.response.status) {
        case 400:
          console.log(
            "🔴 Bad Request: 클라이언트가 올바르지 못한 요청을 보낸 경우",
          );
          errorAlert(error.response.status, error.response.data?.msg);
          // 이행되지 않은 Promise 반환으로 Promise Chaining 단절
          return Promise.reject(error);
        case 401:
          console.log("🔴 Unauthorized: 인증되지 않은 사용자가 접근한 경우");
          errorAlert(
            error.response.status,
            "미인증 사용자 입니다.\n로그인 화면으로 이동 합니다.",
          );
          return Promise.reject(error);
        case 403:
          console.log(
            "🔴 Forbidden: 클라이언트가 콘텐츠에 접근할 권한을 가지고 있지 않을 경우",
          );
          errorAlert(error.response.status, "접근 권한이 없습니다.");
          return Promise.reject(error);
        case 404:
          console.log(
            "🔴 Not Found: 사용자가 사이트에서 존재하지 않는 URL을 탐색했을 경우",
          );
          errorAlert(error.response.status, "API를 찾을 수 없습니다.");
          return Promise.reject(error);
        case 406:
          console.log(
            "🔴 No Acceptable: HTTP headers의 content-type이 부적절한 경우",
          );
          errorAlert(
            error.response.status,
            "HTTP headers의 content-type이 올바르지 않습니다.",
          );
          return Promise.reject(error);
        case 408:
          console.log(
            "🔴 Request Timeout: 요청에 응답하는 시간이 오래 걸리는 경우",
          );
          errorAlert(
            error.response.status,
            "요청 응답시간이 지연되고 있습니다.",
          );
          return Promise.reject(error);
        case 429:
          console.log(
            "🔴 Too Many Requests: 사용자가 지정된 시간에 불필요하게 많은 요청을 보낸 경우",
          );
          errorAlert(
            error.response.status,
            "너무 많은 서버 요청이 발생하고 있습니다.",
          );
          return Promise.reject(error);
        case 500:
          console.log("🔴 Internal Server Error: 서버 오류");
          errorAlert(
            error.response.status,
            "서버 통신 중 장애가 발생하였습니다.",
          );
          return Promise.reject(error);
        default:
          errorAlert(
            error.response.status,
            "서버 통신 중 장애가 발생하였습니다.",
          );
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

// 공통 에러 얼럿 노출 함수
const errorAlert = (status: number, message: string) => {
  throw new Error(`[ERR-${status}] ${message}`);
};
