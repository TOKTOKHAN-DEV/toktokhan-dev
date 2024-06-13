---
sidebar_class_name : hidden
id: react-web.fullbuttonprops
title: FullButtonProps
sidebar_label: FullButtonProps
slug: /react-web.fullbuttonprops
---





`FullButtonProps`는 `FullButton` 컴포넌트가 받는 속성들을 정의합니다. HTMLAnchorElement의 속성을 상속하며, 추가적으로 아래의 속성들을 가집니다.

## Signature

```typescript
interface FullButtonProps extends HTMLAttributes<HTMLAnchorElement> 
```
**Extends:** HTMLAttributes&lt;HTMLAnchorElement&gt;

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

[align?](./react-web.fullbuttonprops.align)


</td><td>


</td><td>

'left' \| 'center'


</td><td>

_(Optional)_ 버튼 내 콘텐츠의 정렬을 지정합니다. 'left' 또는 'center' 중 하나를 선택할 수 있습니다.  'center'


</td></tr>
<tr><td>

[colorMode?](./react-web.fullbuttonprops.colormode)


</td><td>


</td><td>

'light' \| 'dark'


</td><td>

_(Optional)_ 버튼의 색상 모드를 설정합니다. 'light' 또는 'dark' 중 하나를 선택할 수 있습니다.  'dark'


</td></tr>
<tr><td>

[icon](./react-web.fullbuttonprops.icon)


</td><td>


</td><td>

ReactElement


</td><td>

버튼에 표시될 아이콘을 설정합니다. ReactElement 타입이어야 합니다.


</td></tr>
<tr><td>

[iconStyle?](./react-web.fullbuttonprops.iconstyle)


</td><td>


</td><td>

HTMLAttributes&lt;HTMLOrSVGElement&gt;['style']


</td><td>

_(Optional)_ 아이콘의 스타일을 설정합니다.


</td></tr>
<tr><td>

[label?](./react-web.fullbuttonprops.label)


</td><td>


</td><td>

string \| null


</td><td>

_(Optional)_ 버튼에 표시될 레이블을 설정합니다. null 값을 통해 레이블을 숨길 수 있습니다.


</td></tr>
<tr><td>

[labelStyle?](./react-web.fullbuttonprops.labelstyle)


</td><td>


</td><td>

HTMLAttributes&lt;HTMLLabelElement&gt;['style']


</td><td>

_(Optional)_ 레이블의 스타일을 설정합니다.


</td></tr>
<tr><td>

[lang?](./react-web.fullbuttonprops.lang)


</td><td>


</td><td>

'en' \| 'ko'


</td><td>

_(Optional)_ 버튼의 언어를 설정합니다. 'en' 또는 'ko' 중 하나를 선택할 수 있습니다.  'ko'


</td></tr>
<tr><td>

[socialType](./react-web.fullbuttonprops.socialtype)


</td><td>


</td><td>

[SocialType](./react-web.socialtype)


</td><td>

소셜 타입을 지정합니다. 이를 통해 버튼의 스타일과 레이블이 결정됩니다.


</td></tr>
</tbody></table>
