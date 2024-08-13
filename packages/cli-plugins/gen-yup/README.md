# gen-yup

회원가입에 필요한 Yup Schema를 생성하고 RHF와 연결합니다.

## Run

Run the following command:

```
yarn tokript gen:yup
```

## Run Order

1. 파일 이름을 정합니다.

   ```
   use___
   ```

2. 사용할 스키마를 선택합니다.

   ```
   필요한 Schema (Space 선택 / Enter 확정)
   - [ ] 아이디
   - [ ] 비밀번호
   ```

3. 사용할 스키마 중 필수 스키마를 선택합니다.
   ```
   필수 Schema (Space 선택 / Enter 확정)
   - [ ] 아이디
   - [ ] 비밀번호
   ```

## Option

#### output (o)

생성될 파일의 폴더 경로를 설정합니다.

---

#### outputConstants (oc)

정규표현식, 헬퍼텍스트 파일의 생성 경로를 설정합니다.

---

#### importConstants (ic)

정규표현식, 헬퍼텍스트 파일을 불러올 경로를 설정합니다.
