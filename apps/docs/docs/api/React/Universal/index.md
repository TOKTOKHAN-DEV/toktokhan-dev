---
id: react-universal
title: React-universal
sidebar_label: React-universal
slug: /react-universal
---





React 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다.  와 은 `@toktokhan-dev/react-universal`를 포함하고 있습니다.




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

주어진 컴포넌트의 props 타입을 추론하는 유틸리티 타입입니다. *  T - props 타입을 추론할 컴포넌트.

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

서버에서 발생한 오류를 기반으로 에러 메세지 객체를 반환합니다. 외부 백엔드와 협업시에 에러타입을 확인해주세요. api logger에서 사용하고 있으며, 에러 메세지를 통해 toast, alert 등에 적용시킬 수 있습니다. Utils/Logger  T - AxiosError 타입의 제네릭 매개변수입니다.

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

[createSlice(\{ initialState, reducers\})](./react-universal.createslice)

</td>


<td>



</td></tr>
</tbody>
</table>

