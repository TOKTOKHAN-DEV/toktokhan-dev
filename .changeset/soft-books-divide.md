---
'@toktokhan-dev/github': patch
---

- GitHub의 updateExistRepo 메서드에서 앱 인증 로직을 제거했습니다. 해당 API는 JWT로만 인증할 수 있으며, 세분화된 개인 액세스 토큰(fine-grained personal access token)으로는 인증이 되지 않습니다. 인증 과정은 getUser 메서드로 대체했습니다.

- checkTokenValidity => checkAppAuthWithJWT 메서드 명 변경
