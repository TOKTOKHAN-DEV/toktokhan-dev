---
id: node
title: '@toktokhan-dev/node'
sidebar_label: '@toktokhan-dev/node'
slug: /node
---

node환경에서 사용할 수 있는 유틸리티 라이브러리입니다.

## Utils/Fs

<table>
<thead>
<tr>
<th>Utils/Fs</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[checkFileAccess(\{ filename, include, ignored\})](./node.checkfileaccess)

</td>

<td>

파일 접근 권한을 확인합니다.

</td></tr>

<tr><td>

[generateCodeFile(config)](./node.generatecodefile)

</td>

<td>

코드를 파일로 생성하는 함수입니다.

</td></tr>

<tr><td>

[getFilePaths(path)](./node.getfilepaths)

</td>

<td>

주어진 파일 경로의 모든 하위 경로를 반환합니다.

</td></tr>

<tr><td>

[json(path)](./node.json)

</td>

<td>

주어진 JSON 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.

</td></tr>

<tr><td>

[readFileSync(encoding, path)](./node.readfilesync)

</td>

<td>

동기적으로 파일을 읽어오는 함수입니다.

</td></tr>

<tr><td>

[removeAll(path)](./node.removeall)

</td>

<td>

주어진 경로의 디렉터리 또는 파일을 재귀적으로 제거하는 함수입니다. \*

</td></tr>

<tr><td>

[resetDirSync(path)](./node.resetdirsync)

</td>

<td>

주어진 경로에 해당하는 디렉터리를 재설정하는 함수입니다. 주어진 경로의 디렉터리를 먼저 재귀적으로 제거한 후, 새로운 디렉터리를 생성합니다.

</td></tr>

<tr><td>

[yaml(path)](./node.yaml)

</td>

<td>

YAML 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.

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

[boxLog(value, options)](./node.boxlog)

</td>

<td>

box형태의 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[error(value)](./node.error)

</td>

<td>

오류 메시지를 생성하는 함수입니다.

</td></tr>

<tr><td>

[errorLog(title, value)](./node.errorlog)

</td>

<td>

오류 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[existLog(value)](./node.existlog)

</td>

<td>

존재 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[generateLog(value)](./node.generatelog)

</td>

<td>

생성 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[info(value)](./node.info)

</td>

<td>

정보 메시지를 생성하는 함수입니다.

</td></tr>

<tr><td>

[infoLog(title, value)](./node.infolog)

</td>

<td>

정보 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[prettierLog(value)](./node.prettierlog)

</td>

<td>

Prettier 로그를 출력하는 함수입니다.

</td></tr>

<tr><td>

[success(value)](./node.success)

</td>

<td>

성공 메시지를 생성하는 함수입니다.

</td></tr>

<tr><td>

[successLog(title, value)](./node.successlog)

</td>

<td>

성공 로그를 출력하는 함수입니다.

</td></tr>
</tbody>
</table>

## Utils/Path

<table>
<thead>
<tr>
<th>Utils/Path</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[createPackageRoot(dir)](./node.createpackageroot)

</td>

<td>

주어진 디렉터리부터 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로 상대 경로를 사용하여 디렉터리를 생성하는 함수를 반환합니다.

</td></tr>

<tr><td>

[cwd(paths)](./node.cwd)

</td>

<td>

현재 작업 디렉터리(CWD)의 경로를 계산하여 반환하는 함수입니다.

</td></tr>

<tr><td>

[findFile(dir, filename)](./node.findfile)

</td>

<td>

주어진 디렉터리에서 파일을 검색하여 해당 파일의 경로를 반환하는 함수입니다.

</td></tr>

<tr><td>

[findFileToBottom(dir, filename)](./node.findfiletobottom)

</td>

<td>

주어진 디렉터리부터 하위 디렉터리까지 파일을 검색하여 해당 파일의 경로를 반환하는 함수입니다.

</td></tr>

<tr><td>

[findFileToTop(dir, filename)](./node.findfiletotop)

</td>

<td>

주어진 디렉터리부터 상위 디렉터리까지 파일을 검색하여 해당 파일의 경로를 반환하는 함수입니다.

</td></tr>

<tr><td>

[forEachFiles(param, TPath)](./node.foreachfiles)

</td>

<td>

주어진 디렉터리 내의 모든 파일 및 디렉터리에 대해 지정된 작업을 수행하는 함수입니다.

</td></tr>

<tr><td>

[packageRoot(paths)](./node.packageroot)

</td>

<td>

현재 모듈의 디렉터리를 기준으로 package.json 파일의 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로 상대 경로를 사용하여 디렉터리를 생성하는 함수입니다.

</td></tr>

<tr><td>

[pathOf(target)](./node.pathof)

</td>

<td>

주어진 대상 경로를 기준 경로와 결합하여 새 경로를 생성합니다.

</td></tr>

<tr><td>

[pathOn(base)](./node.pathon)

</td>

<td>

주어진 기준 경로를 대상 경로와 결합하여 새 경로를 생성합니다.

</td></tr>
</tbody>
</table>

## Utils/Process

<table>
<thead>
<tr>
<th>Utils/Process</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[withLoading(title, description, callback, options)](./node.withloading)

</td>

<td>

로딩 상태를 보여주면서 비동기 작업을 실행합니다.

</td></tr>
</tbody>
</table>

## Utils/Render

<table>
<thead>
<tr>
<th>Utils/Render</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[renderExportConst(varName, data)](./node.renderexportconst)

</td>

<td>

지정된 변수 이름과 데이터를 사용하여 내보낼 상수를 렌더링합니다.

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

[prettierFile(outputPath, options)](./node.prettierfile)

</td>

<td>

주어진 파일의 내용을 prettier를 사용하여 서식을 맞춥니다.

</td></tr>

<tr><td>

[prettierString(string, options)](./node.prettierstring)

</td>

<td>

주어진 문자열을 prettier를 사용하여 서식을 맞춥니다.

</td></tr>
</tbody>
</table>
