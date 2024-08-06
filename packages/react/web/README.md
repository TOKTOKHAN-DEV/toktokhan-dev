# @toktokhan-dev/react-web

React Web 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다.
자세한 내용 및 제공하는 유틸리티 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/react-web)에서 확인 할 수 있습니다.

## Installation

```bash
npm i @toktokhan-dev/react-web
```

## Preview

```tsx
import { UploadTrigger } from '@toktokhan-dev/react-web'

const ExampleComponent = () => {
  return (
    <UploadTrigger
      by="onClick"
      onChange={(e) => console.log(e.target.files?.[0])}
    >
      <button>Upload</button>
    </UploadTrigger>
  )
}
```
