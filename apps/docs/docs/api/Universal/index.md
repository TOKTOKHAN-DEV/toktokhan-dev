---
id: universal
title: Universal
sidebar_label: Universal
slug: /universal
---





웹,앱 환경에서 사용가능한 유틸리티 라이브러리입니다.




## Functor

<table>
<thead>
<tr>
<th>Functor</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[Keep_F](./universal.keep_f)

</td>


<td>



</td></tr>

<tr><td>

[Maybe_F](./universal.maybe_f)

</td>


<td>



</td></tr>

<tr><td>

[keep](./universal.keep)

</td>


<td>



</td></tr>

<tr><td>

[maybe](./universal.maybe)

</td>


<td>



</td></tr>
</tbody>
</table>



## Types/Static

<table>
<thead>
<tr>
<th>Types/Static</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[ByteUnit](./universal.byteunit)

</td>


<td>

데이터의 양을 나타내는 바이트 단위를 나타내는 타입입니다.

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

[AsyncFn](./universal.asyncfn)

</td>


<td>

비동기 함수의 타입을 정의합니다.

</td></tr>

<tr><td>

[AsyncFnReturn](./universal.asyncfnreturn)

</td>


<td>

비동기 함수의 반환값 타입을 추출합니다.

</td></tr>

<tr><td>

[DeepKeyOf](./universal.deepkeyof)

</td>


<td>

객체의 깊은 키를 나타내는 타입을 추출합니다.

</td></tr>

<tr><td>

[DeepMutable](./universal.deepmutable)

</td>


<td>

객체의 모든 속성에서 readonly 를 제거해줍니다.

</td></tr>

<tr><td>

[DeepNullAble](./universal.deepnullable)

</td>


<td>

객체의 모든 속성을 null 가능하게 만드는 타입을 정의합니다.

</td></tr>

<tr><td>

[DeepOmitReadOnly](./universal.deepomitreadonly)

</td>


<td>

객체의 모든 읽기 전용 속성을 제거하는 타입을 정의합니다.

</td></tr>

<tr><td>

[DeepPartial](./universal.deeppartial)

</td>


<td>

객체의 모든 속성을 옵셔널하게 만듭니다

</td></tr>

<tr><td>

[DeepValueOf](./universal.deepvalueof)

</td>


<td>

객체의 깊은 속성 값을 추출하는 타입을 정의합니다.

</td></tr>

<tr><td>

[Fn](./universal.fn)

</td>


<td>

함수의 타입을 정의합니다.

</td></tr>

<tr><td>

[IfEquals](./universal.ifequals)

</td>


<td>

두 개의 타입이 동일한지를 확인하고, 동일하다면 지정된 타입으로, 그렇지 않다면 다른 타입으로 설정하는 타입을 정의합니다.

</td></tr>

<tr><td>

[Indices](./universal.indices)

</td>


<td>

배열의 인덱스 타입을 추출하는 타입을 정의합니다.

</td></tr>

<tr><td>

[ItemOf](./universal.itemof)

</td>


<td>

배열 또는 읽기 전용 배열의 요소 타입을 추출하는 타입을 정의합니다.

</td></tr>

<tr><td>

[MockedFn](./universal.mockedfn)

</td>


<td>

`MockedFn`은 Jest의 mock 함수를 타입으로 나타내는 유틸리티 타입입니다.

</td></tr>

<tr><td>

[Mutable](./universal.mutable)

</td>


<td>

객체의 모든 속성에서 readonly 를 제거합니다.

</td></tr>

<tr><td>

[NonNullableProps](./universal.nonnullableprops)

</td>


<td>

객체에서 모든 property 가 NonNullable 타입이 되도록 합니다.

</td></tr>

<tr><td>

[NullAble](./universal.nullable)

</td>


<td>

객체의 모든 속성을 nullable 하게 합니다.

</td></tr>

<tr><td>

[Obj](./universal.obj)

</td>


<td>

키와 값의 타입이 있는 객체의 타입을 정의합니다.

</td></tr>

<tr><td>

[OmitReadOnly](./universal.omitreadonly)

</td>


<td>

객체에서 읽기 전용 속성을 제거합니다

</td></tr>

<tr><td>

[Parameter](./universal.parameter)

</td>


<td>

함수의 첫번째 인자 타입을 가져옵니다.

</td></tr>

<tr><td>

[ReadonlyKeysOf](./universal.readonlykeysof)

</td>


<td>

객체의 readonly 한 속성의 키를 추출합니다.

</td></tr>

<tr><td>

[RecursiveObj](./universal.recursiveobj)

</td>


<td>

재귀하는 타입을 가지는 객체를 정의합니다.

</td></tr>

<tr><td>

[ValueOf](./universal.valueof)

</td>


<td>

객체의 모든 속성의 타입을 추출합니다

</td></tr>
</tbody>
</table>



## Utils/Array

<table>
<thead>
<tr>
<th>Utils/Array</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[arrayToMap(keySelector, arr)](./universal.arraytomap)

</td>


<td>

배열을 Map으로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다. *

</td></tr>

<tr><td>

[arrayToRecord(keySelector, arr)](./universal.arraytorecord)

</td>


<td>

배열을 Record로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다. *

</td></tr>

<tr><td>

[paginate(limit, arr)](./universal.paginate)

</td>


<td>

배열을 특정 갯수로 나누어주는 함수입니다.

</td></tr>
</tbody>
</table>



## Utils/Decode

<table>
<thead>
<tr>
<th>Utils/Decode</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[jwtDecode(token, options)](./universal.jwtdecode)

</td>


<td>



</td></tr>

<tr><td>

[jwtDecode(token, options)](./universal.jwtdecode_1)

</td>


<td>



</td></tr>
</tbody>
</table>



## Utils/Fetch

<table>
<thead>
<tr>
<th>Utils/Fetch</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[fetchHelper(defaultOptions)](./universal.fetchhelper)

</td>


<td>

고차 함수로 fetch를 확장하거나, interceptor, baseUrl, headers 을 옵션으로 넣어 사용할 수 있습니다.

</td></tr>

<tr><td>

[FetchHelperDefaultOptions](./universal.fetchhelperdefaultoptions)

</td>


<td>

`fetchHelper` 함수의 옵션입니다.

</td></tr>

<tr><td>

[FetchHelperType](./universal.fetchhelpertype)

</td>


<td>

`fetchHelper` 함수의 타입입니다. 이는 사용자 지정 `fetchHelper` 함수를 작성하고자 할 때 유용합니다.

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

[byteFrom(from, value)](./universal.bytefrom)

</td>


<td>

특정 바이트 단위를 바이트로 변환합니다.

</td></tr>

<tr><td>

[byteFromTo(from, to, value)](./universal.bytefromto)

</td>


<td>

특정 바이트 단위를 다른 바이트 단위로 변환합니다.

</td></tr>

<tr><td>

[byteTo(to, value)](./universal.byteto)

</td>


<td>

바이트를 특정 바이트 단위로 변환합니다.

</td></tr>

<tr><td>

[isOverSize(maxSize, value)](./universal.isoversize)

</td>


<td>

 Utils/File 주어진 파일 크기가 최대 크기를 초과하는지 확인하는 함수입니다.

</td></tr>
</tbody>
</table>



## Utils/Fn

<table>
<thead>
<tr>
<th>Utils/Fn</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[awaited(fn, data)](./universal.awaited)

</td>


<td>

Promise 를 받아 resolve 된 값으로 함수를 실행합니다.

</td></tr>

<tr><td>

[collect(args)](./universal.collect)

</td>


<td>

arguments 를 배열로써 반환합니다.

</td></tr>

<tr><td>

[effect(fn, x)](./universal.effect)

</td>


<td>

함수를 실행하고, 인자를 그대로 반환합니다. 컴포넌트 합성시(lodash.flow) 함수의 응닶값에 영향을 미치지 않고 특정 함수를 실행시키고 싶을 경우 유용합니다.

</td></tr>

<tr><td>

[isEvery(fns)](./universal.isevery)

</td>


<td>

여러 함수들이 모두 주어진 인자에 대해 true를 반환하는지 확인합니다. 주어진 함수 배열(fns)에 대해 모든 함수가 인자를 받아들여 true를 반환하는지 여부를 검사합니다.

</td></tr>

<tr><td>

[not(fn)](./universal.not)

</td>


<td>

주어진 함수의 부정값을 반환합니다. 주어진 함수를 실행하고 그 결과를 부정하여 반환합니다.

</td></tr>

<tr><td>

[or(def, value)](./universal.or)

</td>


<td>

주어진 값이 null 또는 undefined인 경우 기본값을 반환하고, 그렇지 않으면 주어진 값을 반환합니다.

</td></tr>

<tr><td>

[pass(data)](./universal.pass)

</td>


<td>

주어진 데이터를 반환하는 함수를 생성합니다.

</td></tr>

<tr><td>

[relay(params)](./universal.relay)

</td>


<td>

인자로 넘겨준 getNext 함수를 연속적으로 호출하여 데이터를 가져오는 함수입니다. 호출된 데이터를 순서대로 배열로 반환합니다.주로 pagination 된 데이터의 모든 페이지를 가져오는데 사용됩니다.

</td></tr>

<tr><td>

[retryReqeustManager()](./universal.retryreqeustmanager)

</td>


<td>

주로 refresh token 이 필요한 요청을 관리하는 함수입니다. 토큰이 만료됐을 시, refresh token 을 요청하고, 새로운 토큰을 받아서 요청을 재시도합니다.

</td></tr>

<tr><td>

[runIfFn(valueOrFn, args)](./universal.runiffn)

</td>


<td>

주어진 값이 함수인 경우 주어진 인자들을 사용하여 실행하고, 그렇지 않으면 주어진 값을 그대로 반환합니다.

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

[log(title, value)](./universal.log)

</td>


<td>

주어진 값을 로깅하고 반환합니다.

</td></tr>
</tbody>
</table>



## Utils/Math

<table>
<thead>
<tr>
<th>Utils/Math</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[add(a, b)](./universal.add)

</td>


<td>

두개의 숫자를 더합니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

</td></tr>

<tr><td>

[devide(a, b)](./universal.devide)

</td>


<td>

두개의 숫자를 나눕니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

</td></tr>

<tr><td>

[getDecimalPlaces(numnbers)](./universal.getdecimalplaces)

</td>


<td>

숫자들의 소수점 자리수중 가장 긴 소수점 자리의 길이를 구합니다.

</td></tr>

<tr><td>

[multiply(a, b)](./universal.multiply)

</td>


<td>

두개의 숫자를 곱합니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

</td></tr>

<tr><td>

[subtract(a, b)](./universal.subtract)

</td>


<td>

두개의 숫자를 뺍니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

</td></tr>
</tbody>
</table>



## Utils/Object

<table>
<thead>
<tr>
<th>Utils/Object</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[createObjBySelector(mapper, prev)](./universal.createobjbyselector)

</td>


<td>

객체에서 선택된 속성을 기반으로 새로운 객체를 생성합니다. *

</td></tr>

<tr><td>

[flatObject(params, obj)](./universal.flatobject)

</td>


<td>

재귀적으로 중첩된 객체를 평탄화하는 함수입니다.

</td></tr>

<tr><td>

[removeEmptyObject(obj)](./universal.removeemptyobject)

</td>


<td>

주어진 객체에서 빈 객체를 제거하는 함수입니다.

</td></tr>

<tr><td>

[volumeUpObject(flag, obj)](./universal.volumeupobject)

</td>


<td>

객체의 key 에서 flag 를 찾아서 해당 flag 를 기준으로 중첩 객체를 만들어주는 함수입니다.

</td></tr>

<tr><td>

[DataOrFn](./universal.dataorfn)

</td>


<td>

데이터 또는 함수를 나타내는 타입입니다.

</td></tr>
</tbody>
</table>



## Utils/String

<table>
<thead>
<tr>
<th>Utils/String</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[prefix(pre, str)](./universal.prefix)

</td>


<td>

문자열에 접두사를 추가합니다.

</td></tr>

<tr><td>

[removeStr(str, s)](./universal.removestr)

</td>


<td>

문자열에서 지정된 문자열을 제거합니다.

</td></tr>

<tr><td>

[suffix(suf, str)](./universal.suffix)

</td>


<td>

문자열에 접미사를 추가합니다.

</td></tr>
</tbody>
</table>

