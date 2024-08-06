---
'@toktokhan-dev/github': patch
---

# createRepo 메소드에 isPublic 파라미터 추가

GitHubManager 클래스의 createRepo 메소드가 선택적인 isPublic 파라미터를 받습니다. isPublic이 true인 경우 생성된 저장소는 공개됩니다. 그렇지 않으면 비공개로 설정됩니다.
