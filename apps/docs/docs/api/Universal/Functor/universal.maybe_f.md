---
id: universal.maybe_f
title: Maybe_F
sidebar_label: Maybe_F
slug: /universal.maybe_f
---





## Signature

```typescript
declare class Maybe_F<T> 
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)($value)](./universal.maybe_f._constructor_)


</td><td>


</td><td>

Constructs a new instance of the `Maybe_F` class


</td></tr>
</tbody></table>

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

[$value](./universal.maybe_f._value)


</td><td>


</td><td>

T \| null \| undefined


</td><td>


</td></tr>
<tr><td>

[isNothing](./universal.maybe_f.isnothing)


</td><td>

`readonly`


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[map](./universal.maybe_f.map)


</td><td>


</td><td>

&lt;R&gt;(fn: (value: T) =&gt; R) =&gt; [Maybe_F](./universal.maybe_f)&lt;R&gt;


</td><td>


</td></tr>
<tr><td>

[of](./universal.maybe_f.of)


</td><td>

`static`


</td><td>

&lt;T_1&gt;(x: T_1) =&gt; [Maybe_F](./universal.maybe_f)&lt;T_1&gt;


</td><td>


</td></tr>
</tbody></table>
