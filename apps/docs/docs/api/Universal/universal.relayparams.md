---
sidebar_class_name : hidden
id: universal.relayparams
title: RelayParams
sidebar_label: RelayParams
slug: /universal.relayparams
---





## Signature

```typescript
interface RelayParams<Data, NextParam, Selected> 
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

[getNext](./universal.relayparams.getnext)


</td><td>


</td><td>

(nextParam: NextParam) =&gt; Promise&lt;Data&gt;


</td><td>

다음 데이터를 가져오는 함수입니다. getNextParams 으로 부터 받은 파라미터를 이용하여 데이터를 가져옵니다. getNextParams 가 null 을 반환하면 getNext 는 호출되지 않습니다.


</td></tr>
<tr><td>

[getNextParams](./universal.relayparams.getnextparams)


</td><td>


</td><td>

(last: Data) =&gt; NextParam \| null


</td><td>

다음 데이터를 가져오기 위한 파라미터를 반환하는 함수입니다. 이전 마지막으로 여청한 getNext 에서 받은 데이터를 이용하여 다음 데이터를 가져오기 위한 파라미터를 반환합니다. null 을 반환하면, 데이터를 가져오는 것을 중지합니다.


</td></tr>
<tr><td>

[initialParam](./universal.relayparams.initialparam)


</td><td>


</td><td>

NextParam


</td><td>

첫번째 호출시 넘겨줄 파라미터입니다.


</td></tr>
<tr><td>

[selector?](./universal.relayparams.selector)


</td><td>


</td><td>

(data: Data[]) =&gt; Selected


</td><td>

_(Optional)_ 각 페이지별 데이터를 포메팅하여 원하는 형태의 데이터를 반환하게끔 합니다.


</td></tr>
</tbody></table>
