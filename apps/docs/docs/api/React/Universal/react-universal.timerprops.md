---
sidebar_class_name : hidden
id: react-universal.timerprops
title: TimerProps
sidebar_label: TimerProps
slug: /react-universal.timerprops
---





## Signature

```typescript
interface TimerProps 
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

[autoStart?](./react-universal.timerprops.autostart)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ 타이머가 초기화 시 자동으로 시작될지 여부  true


</td></tr>
<tr><td>

[interval?](./react-universal.timerprops.interval)


</td><td>


</td><td>

number


</td><td>

_(Optional)_ 타이머가 업데이트되는 간격(밀리초 단위)  1000ms


</td></tr>
<tr><td>

[onTimeOver?](./react-universal.timerprops.ontimeover)


</td><td>


</td><td>

() =&gt; void


</td><td>

_(Optional)_ 시간이 종료되었을 때 호출되는 콜백 함수


</td></tr>
<tr><td>

[onTimeUpdate?](./react-universal.timerprops.ontimeupdate)


</td><td>


</td><td>

(time: number) =&gt; void


</td><td>

_(Optional)_ 매 시간 업데이트 시 호출되는 콜백 함수


</td></tr>
<tr><td>

[setTimeFormat?](./react-universal.timerprops.settimeformat)


</td><td>


</td><td>

(time: number) =&gt; string


</td><td>

_(Optional)_ 시간을 표시하는 형식을 설정하는 함수  ()=&gt;"mm:ss" 형식


</td></tr>
<tr><td>

[timeLimit?](./react-universal.timerprops.timelimit)


</td><td>


</td><td>

number


</td><td>

_(Optional)_ 타이머의 제한 시간(밀리초 단위)


</td></tr>
</tbody></table>
