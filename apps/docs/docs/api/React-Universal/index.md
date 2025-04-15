---
id: react-universal
title: '@toktokhan-dev/react-universal'
sidebar_label: '@toktokhan-dev/react-universal'
slug: /react-universal
---

React 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다. 와 은 `@toktokhan-dev/react-universal`를 포함하고 있습니다.

## Components

<table>
<thead>
<tr>
<th>Components</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[EmptyView(\{ children, data, fallback\})](./react-universal.emptyview)

</td>

<td>

`EmptyView` 컴포넌트는 데이터가 비어있는 경우 `fallback`을, 데이터가 존재하는 경우 `children`을 렌더링합니다.

</td></tr>

<tr><td>

[LoadingView(\{ children, isLoading, fallback\})](./react-universal.loadingview)

</td>

<td>

`LoadingView` 컴포넌트는 로딩 상태를 처리하여 로딩 중일 때는 `fallback`을, 로딩이 완료되었을 때는 `children`을 렌더링합니다.

</td></tr>
</tbody>
</table>

## Hooks

<table>
<thead>
<tr>
<th>Hooks</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[useCallbackRef(callback)](./react-universal.usecallbackref)

</td>

<td>

</td></tr>

<tr><td>

[useYieldLogic()](./react-universal.useyieldlogic)

</td>

<td>

특정 로직을 동작시킬 때 비동기로 제어권을 양도하는 로직을 쉽게 사용하기 위해 구현한 hooks 입니다.endYield 함수의 인자로 값을 전달한다면 startYield의 반환값으로 사용할 수 있습니다.

</td></tr>
</tbody>
</table>

## Hooks/useTimer()

<table>
<thead>
<tr>
<th>Hooks/useTimer()</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[useTimer(\{ autoStart, timeLimit, interval, setTimeFormat, onTimeOver, onTimeUpdate\})](./react-universal.usetimer)

</td>

<td>

Hooks/useTimer() 타이머를 관리하는 커스텀 훅입니다.

</td></tr>
</tbody>
</table>

## Hooks/useTimer()/Context(Optional)

<table>
<thead>
<tr>
<th>Hooks/useTimer()/Context(Optional)</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[TimerProvider(\{ children, params\})](./react-universal.timerprovider)

</td>

<td>

Hooks/useTimer()/Context(Optional) 이 프로바이더는 타이머 상태를 컨텍스트를 통해 지역/전역적으로 관리할 수 있도록 해줍니다.

</td></tr>

<tr><td>

[useTimerContext(selector)](./react-universal.usetimercontext)

</td>

<td>

Hooks/useTimer()/Context(Optional) 타이머 컨텍스트를 사용하는 커스텀 훅입니다. selector를 통해 컨텍스트의 값을 가져올 수 있습니다.

</td></tr>

<tr><td>

[withTimerProvider(Component, params)](./react-universal.withtimerprovider)

</td>

<td>

Hooks/useTimer()/Context(Optional) 타이머 컨텍스트를 제공하는 컴포넌트 HOC입니다. 이 HOC를 사용하여 컴포넌트를 래핑하면, 해당 컴포넌트와 하위 컴포넌트에서 타이머 상태를 공유할 수 있습니다.

</td></tr>
</tbody>
</table>

## Types/Utility

<table>
<thead>
<tr>
<th>Types/Utility</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[PropsOf](./react-universal.propsof)

</td>

<td>

주어진 컴포넌트의 props 타입을 추론하는 유틸리티 타입입니다. \* T - props 타입을 추론할 컴포넌트.

</td></tr>
</tbody>
</table>

## Utils/File

<table>
<thead>
<tr>
<th>Utils/File</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[fileToBase64(file)](./react-universal.filetobase64)

</td>

<td>

</td></tr>
</tbody>
</table>

## Utils/Format

<table>
<thead>
<tr>
<th>Utils/Format</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[formatNumberKR(num)](./react-universal.formatnumberkr)

</td>

<td>

</td></tr>

<tr><td>

[formatPhoneNumberKR(phone)](./react-universal.formatphonenumberkr)

</td>

<td>

</td></tr>
</tbody>
</table>

## Utils/Logger

<table>
<thead>
<tr>
<th>Utils/Logger</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[apiLogger(params)](./react-universal.apilogger)

</td>

<td>

</td></tr>

<tr><td>

[genErrorByServer(errors)](./react-universal.generrorbyserver)

</td>

<td>

서버에서 발생한 오류를 기반으로 에러 메세지 객체를 반환합니다. 외부 백엔드와 협업시에 에러타입을 확인해주세요. api logger에서 사용하고 있으며, 에러 메세지를 통해 toast, alert 등에 적용시킬 수 있습니다. Utils/Logger T - AxiosError 타입의 제네릭 매개변수입니다.

</td></tr>

<tr><td>

[styledConsole(\{ topic, title, data, topicColor, method, errors\})](./react-universal.styledconsole)

</td>

<td>

</td></tr>
</tbody>
</table>

## Utils/React

<table>
<thead>
<tr>
<th>Utils/React</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[createContextSelector(useHook, initialProps)](./react-universal.createcontextselector)

</td>

<td>

Utils/React 커스텀 훅을 기반으로 컨텍스트와 관련된 유틸리티를 생성하는 함수입니다. 이 함수는 주어진 훅을 컨텍스트로 감싸는 `Provider`, `useContext` 훅, 그리고 컴포넌트를 컨텍스트로 감싸는 `withProvider` HOC를 반환합니다. T - 컨텍스트에서 사용할 데이터 타입 P - 훅의 파라미터 타입

</td></tr>

<tr><td>

[createSlice(\{ initialState, reducers\})](./react-universal.createslice)

</td>

<td>

</td></tr>
</tbody>
</table>
