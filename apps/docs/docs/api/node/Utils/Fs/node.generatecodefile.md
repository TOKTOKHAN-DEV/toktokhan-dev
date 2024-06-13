---
id: node.generatecodefile
title: GenerateCodeFile()
sidebar_label: GenerateCodeFile()
slug: /node.generatecodefile
---





코드를 파일로 생성하는 함수입니다.

## Signature

```typescript
generateCodeFile: (config: {
  outputPath: string;
  prettier?: ExtendedPrettierOptions;
}) => (code: string) => Promise<void>
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

config


</td><td>

\{ outputPath: string; prettier?: [ExtendedPrettierOptions](./node.extendedprettieroptions); \}


</td><td>

코드 파일 생성에 필요한 설정 객체


</td></tr>
</tbody></table>
## Returns

(code: string) =&gt; Promise&lt;void&gt;

## Example


```typescript
// 코드 파일 생성 예시
const code = 'const message = "Hello, world!";'

await generateCodeFile({
  outputPath: 'output/example.js',
}, code)

await generateCodeFile({
  outputPath: 'output/example.js',
})(code)

const genExample = generateCodeFile({
  outputPath: 'output/example.js',
  prettier: { semi: false, singleQuote: true },
})

await genExample(code)
```

