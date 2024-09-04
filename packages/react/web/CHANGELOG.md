# @toktokhan-dev/react-web

## 0.0.22

### Patch Changes

- Updated dependencies [[`2dfc002`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/2dfc00257f5bbf669a065d43d304e193307a3481), [`75af6e3`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/75af6e3b3d33c93292f41e79fe76e8bcbcb2a38e), [`8990c64`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/8990c6412854fd806260b14abe2563f4204a68db)]:
  - @toktokhan-dev/react-universal@0.0.11

## 0.0.21

### Patch Changes

- 0775ea1: - Social 관련 모듈 테스트 코드 추가
  - useOauthPopupCallback closePopup 함수 타입 변경 (only return value)
  - useOauthPopupListener error handling
  - IconButton aria-label 추가
- Updated dependencies [a0f73d6]
  - @toktokhan-dev/react-universal@0.0.10

## 0.0.20

### Patch Changes

- 98ee403: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- Updated dependencies [98ee403]
- Updated dependencies [94e2b25]
  - @toktokhan-dev/react-universal@0.0.9
  - @toktokhan-dev/universal@0.0.8

## 0.0.19

### Patch Changes

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7
  - @toktokhan-dev/react-universal@0.0.8

## 0.0.18

### Patch Changes

- 7acf070: 소셜 버튼 스타일 수정
  KakaoButton variant 추가
  radius 수정 기본 6px

## 0.0.17

### Patch Changes

- ea7ff30: New Component 'UploadTrigger'

  새로운 컴포넌트 'UploadTrigge' 이 추가 되었습니다. 웹에서 파일 업로드를 트리거 하는 컴포넌트 입니다.

  자식 element 에 by 로 지정한 이벤트를 트리거 하면 display none 처리 되어있는 input[type="file"] 클릭되어 파일 선택 창이 열립니다.
  UploadTrigger 의 props 는 숨겨져 있는 input 의 prop 으로 전달되기때문에,
  UploadTrigger 의 onChange prop 으로 선택된 파일에 접근이 가능합니다.

  ### example

  ```tsx
  <UploadTrigger
    by="onClick"
    onChange={(e) => console.log(e.target.files?.[0])}
  >
    <button>Upload</button>
  </UploadTrigger>
  ```

  ### exmaple 2

  ```tsx
  type Props {
      text: string
      onAdd?: () => void
  }

  const Component = ({ onAdd, text }: Props) => {
    return <button onClick={onAdd}>{text}</button>
  }

  render(
    <UploadTrigger by="onAdd" onChange={mockOnChange}>
      <Component text="add" />
    </UploadTrigger>,
  )
  ```

  ### upload trigger

  ```tsx
  export const UploadTrigger = ({
    children,
    by = 'onClick',
    ...props
  }: UploadTriggerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
      inputRef.current?.click()
    }

    return (
      <>
        {cloneElement(children, { [by]: handleClick })}
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          value=""
          {...props}
        />
      </>
    )
  }
  ```

## 0.0.16

### Patch Changes

- 02833b3: # '@toktokhan-dev/tokit'

  github api를 조회할 때 토큰이 주입되지 않아 개인화되지 않은 요청을 하고 있었습니다. 개인화 되지 않은 요청은 1시간 60번 제한이 있습니다.
  [GitHub REST API의 요청 제한에 대한 자세한 정보는 여기에서 확인할 수 있습니다.](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28)

  # '@toktokhan-dev/react-web':

  react-query 패키지가 불필요하게 설치되는 이유로 삭제했습니다.

- 48e8a88: remove dependency react-query

## 0.0.15

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/react-universal@0.0.7

## 0.0.14

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/react-universal@0.0.6

## 0.0.13

### Patch Changes

- Updated dependencies [96c995f]
  - @toktokhan-dev/react-universal@0.0.5

## 0.0.12

### Patch Changes

- 8e159f8: Social login 에 사용되는 FullButton 컴포넌트에 labelStyle이 적용되어있지 않던 이슈를 수정했습니다.

## 0.0.11

### Patch Changes

- f17800a: social login hooks, types

  ## useOauthLinkCallback, useOauthPopupCallback, useOauthPopupListener 의 state

  oauth 플로우 중 state 로써 사용되는 socialType 과 returnUrl 과 같은 값들을 유저가 자유롭게 사용할 수 있게 수정되었습니다.

  state 는 JSON 형태로 파싱 가능한 어떤 값이든 사용하여 플로우상에서 사용할 수 있습니다. (string, number, object, array ...)

  ### 기존

  ```tsx
  // pages/login.tsx
  const Login = () => {
    return (
      <KakaoButton
        onClick={() =>
          kakao.loginToLink({
            redirect_uri: `${window.origin}/social/callback`,
            return_url: '/login',
          })
        }
      />
    )
  }

  // pages/social/callback.tsx
  const Callback = () => {
    const result = useOauthLinkCallback({
      onSuccess: (res) => {
        console.log('res', res.data.returnUrl)
      },
    })

    return <></>
  }
  ```

  ### 변경

  ```tsx
  // pages/login.tsx
  const Login = () => {
    return (
      <KakaoButton
        onClick={() =>
          kakao.loginToLink({
            redirect_uri: `${window.origin}/social/callback`,
            state: {
              returnUrl: returnUrl || '/login',
              type: 'kakao',
            },
          })
        }
      />
    )
  }

  // pages/social/callback.tsx
  const Callback = () => {
    const result = useOauthLinkCallback<{ returnUrl: string }>({
      onSuccess: (res) => {
        console.log('res', res.state.returnUrl)
      },
    })

    return <></>
  }
  ```

  ## useOauthPopupCallback, useOauthPopupListener 의 extra state

  주로 callback hook 은 popup 윈도우에서 listener hook 은 부모 window 에서 사용하게 됩니다.

  기존 popup window 에서 부모 window 로 oauth response 만 전달되던 방식에서 추가적인 데이터를 주고 받을 수 있도록 개선되었습니다.

  useOauthPopupCallback 에서 제공되는 closePopup 함수를 통해 부모 window 에게 특정 데이터를 전달 할 수 있습니다.

  ```tsx
  // /social/callback (popup window)
  const PopupCallback = () => {
    useOauthPopupCallback({
      onSuccess: (res) => {
        console.log('succeed to login', res)
        res.closePopup({ message: 'Hello Parents Window!' })
      },
    })

    return <Splash />
  }

  // /login (parents window)
  const Login = () => {
    const { data } = useOauthPopupListener<unknown, { message: string }>({
      onSuccess: (res) => {
        console.log(res.code)
        console.log(res.extra.message) // Heelo Parents Window!
      },
    })
  }
  ```

## 0.0.10

### Patch Changes

- c61b283: add sycned-cookie

  모듈 `SyncedCookie` 가 추가되었습니다. 내부적으로 react-cookie 를 사용하고 있으며
  기존 `SyncedStorage` 와 동일하게 `useWebStorage` 와 함께 사용 가능합니다.

  `SyncedCookie` 가 추가 됨에 따라 `SyncedStorageFactory` 에서 `createCookie` 메소드가 추가되었습니다.

  ```ts
  const { connector: testConnector, storage: testStorage } =
    SyncedStorageFactor.createCookie<string>('test')

  testStorage.set((prev) => prev + '!')

  // Some Component
  const test = useWebStorage(testConnector)
  ```

## 0.0.9

### Patch Changes

- 15459c1: oauth callback 함수의 onFail 인자에 returnUrl, onClose(팝업의 경우)함수를 추가했습니다.

## 0.0.8

### Patch Changes

- cbe23ec: add dependency on useIntersectionObserver

  useIntersectionObserver hook 에 observer instance 생성 초기화를 위한 dependency param 이 추가되었습니다.

  ```ts
  useIntersectionObserver(
    {
      onVisible: () => {
        if (!isFetcing) {
          refetch()
        }
      },
    },
    [isFetching],
  )
  ```

## 0.0.7

### Patch Changes

- ed18c00: Oauth 반환 code를 token 에서 code로 변경하였습니다.

## 0.0.6

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4
  - @toktokhan-dev/react-universal@0.0.4

## 0.0.5

### Patch Changes

- 5ac71c0: Social hook 을 수정하였습니다.

  - onSuccess 의 파라미터에서 isLoading을 제거하였습니다.

## 0.0.4

### Patch Changes

- 47cb2b6: - 카카오 버튼 속성이 아이콘속성으로 되어있던 이슈를 수정했습니다.
  - a tag의 필요한 속성만 상속시키게 변경되었습니다.
  - 사용자가 선택하여 최적화를 시킬 수 있도록 컴포넌트 메모이제이션을 제거했습니다.
  - 주석을 업데이트하고, 타 소셜 버튼과 통일시켰습니다.

## 0.0.3

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/react-universal@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/react-universal@0.0.2

## 0.0.1

### Patch Changes

- be73950: React Web 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다.
  [Docs:@toktokhan-dev/react-web](https://toktokhan-dev-docs.vercel.app/docs/react-web)
- Updated dependencies [6f42208]
- Updated dependencies [b557ce1]
  - @toktokhan-dev/universal@0.0.1
  - @toktokhan-dev/react-universal@0.0.1

## 0.3.1

### Patch Changes

- bb60ca7: ignore sourcemap file
- Updated dependencies [bb60ca7]
  - @toktokhan-dev/react-universal@0.3.1
  - @toktokhan-dev/universal@1.3.1

## 0.3.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/react-universal@0.3.0
  - @toktokhan-dev/universal@1.3.0

## 0.2.0

### Minor Changes

- ea08e81: update temp

### Patch Changes

- Updated dependencies [ea08e81]
  - @toktokhan-dev/react-universal@0.2.0

## 0.1.0

### Minor Changes

- b75ab4c: update

### Patch Changes

- Updated dependencies [b75ab4c]
  - @toktokhan-dev/react-universal@0.1.0

## 0.0.2

### Patch Changes

- 1636561: creation react packages
- Updated dependencies [1636561]
  - @toktokhan-dev/react-universal@0.0.2
