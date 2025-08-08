---
id: universal.jwtdecode
title: JwtDecode()
sidebar_label: JwtDecode()
slug: /universal.jwtdecode
---






## Signature

```typescript
declare function jwtDecode<T = JwtHeader>(token: string, options: JwtDecodeOptions & {
  header: true;
}): T;
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

token


</td><td>

string


</td><td>

target


</td></tr>
<tr><td>

options


</td><td>

[JwtDecodeOptions](./universal.jwtdecodeoptions) &amp; \{ header: true; \}


</td><td>

jwt decode option


</td></tr>
</tbody></table>

## Returns

T

decoded

