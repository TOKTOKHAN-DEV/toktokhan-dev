---
'@toktokhan-dev/react-web': patch
'@toktokhan-dev/tokit': patch
---

# '@toktokhan-dev/tokit'

github api를 조회할 때 토큰이 주입되지 않아 개인화되지 않은 요청을 하고 있었습니다. 개인화 되지 않은 요청은 1시간 60번 제한이 있습니다.
[GitHub REST API의 요청 제한에 대한 자세한 정보는 여기에서 확인할 수 있습니다.](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28)

# '@toktokhan-dev/react-web':

react-query 패키지가 불필요하게 설치되는 이유로 삭제했습니다.
