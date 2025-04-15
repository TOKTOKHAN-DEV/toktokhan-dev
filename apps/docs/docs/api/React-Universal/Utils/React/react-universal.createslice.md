---
id: react-universal.createslice
title: CreateSlice()
sidebar_label: CreateSlice()
slug: /react-universal.createslice
---





## Signature

```typescript
createSlice: <S, R extends ReducerMap<S, any>>({
  initialState,
  reducers
}: CreateReducerParams<S, R>) => {
  initialState: S;
  reducer: void | S extends ValidRecipeReturnType<S> ? (base: Immutable<S>, action: ActionsByMap<S, R>) => S : never;
}
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

\{ initialState, reducers\}


</td><td>

CreateReducerParams&lt;S, R&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

\{ initialState: S; reducer: void \| S extends ValidRecipeReturnType&lt;S&gt; ? (base: Immutable&lt;S&gt;, action: ActionsByMap&lt;S, R&gt;) =&gt; S : never; \}

