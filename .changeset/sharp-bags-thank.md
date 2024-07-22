---
'@toktokhan-dev/tokit': patch
---

consider package manager, remove un-using files

- 선택한 package manager 에 따라, npm scripts, husky 등이 수정된 상태로 clone 되도록 수정되었습니다.
- 프로젝트에선 쓰이지 않는 .changeset, .github 과 같은 파일을 제거하고, @changeset/cli 도 devDependencies 에서 제거된 상태로 clone 되도록 수정되었습니다.
