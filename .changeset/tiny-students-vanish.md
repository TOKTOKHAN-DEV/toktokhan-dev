---
'@toktokhan-dev/react-universal': patch
---

## create-context-selector.tsx

인자로 받는 hook이 parmeter를 받는 hook 도 허용할 수 있도록 개선되었습니다.

```tsx

type Parameters = {
  value: string
}

// useHook.ts
const useHook = ({value}: Parameters) = {
) => {
  const [value, setValue] = useState(value)
  return value
}

export const {Provider, useContext, withProvider} = createContextSelector<ReturnType<typeof useTimer>, Parameters>(useHook, {value: 'some value'})

// app.tsx
const App = () => (
  <Provider params={{value: 'some value'}}>
      <ValueDisplay/>
   </Provider>
);

// app.tsx
const App = ()=> <ValueDisplay/>
export default withProvider(App, {value: 'some value'})
```
