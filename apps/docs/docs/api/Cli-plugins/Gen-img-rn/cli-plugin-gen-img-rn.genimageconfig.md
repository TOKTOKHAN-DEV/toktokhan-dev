---
sidebar_class_name : hidden
id: cli-plugin-gen-img-rn.genimageconfig
title: GenImageConfig
sidebar_label: GenImageConfig
slug: /cli-plugin-gen-img-rn.genimageconfig
---





## Signature

```typescript
interface GenImageConfig 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[basePath?](./cli-plugin-gen-img-rn.genimageconfig.basepath)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 생성될 객체의 value 에 할당될 경로의 base-path 입니다


</td></tr>
<tr><td>

[displayName?](./cli-plugin-gen-img-rn.genimageconfig.displayname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 생성될 image 객체의 이름입니다


</td></tr>
<tr><td>

[formatKey?](./cli-plugin-gen-img-rn.genimageconfig.formatkey)


</td><td>


</td><td>

(fileName: string) =&gt; string


</td><td>

_(Optional)_ key 값을 결정할 포멧함수입니다. 기본적으로, SNAKE_UPPER_CASE 로 생성됩니다.


</td></tr>
<tr><td>

[ignored?](./cli-plugin-gen-img-rn.genimageconfig.ignored)


</td><td>


</td><td>

string[]


</td><td>

_(Optional)_ 제외 될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다.


</td></tr>
<tr><td>

[includes?](./cli-plugin-gen-img-rn.genimageconfig.includes)


</td><td>


</td><td>

string[]


</td><td>

_(Optional)_ 생성될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에만 객체에 포함됩니다.


</td></tr>
<tr><td>

[input?](./cli-plugin-gen-img-rn.genimageconfig.input)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 조회할 img 파일들이 포함되어있는 폴더 입니다.


</td></tr>
<tr><td>

[oneDepth?](./cli-plugin-gen-img-rn.genimageconfig.onedepth)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ one depth 가 true 일 경우, 폴더 구조를 무시하고 one depth 로 객체를 생성합니다.


</td></tr>
<tr><td>

[output?](./cli-plugin-gen-img-rn.genimageconfig.output)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 생성될 파일이 위치할 경로입니다.


</td></tr>
</tbody></table>
