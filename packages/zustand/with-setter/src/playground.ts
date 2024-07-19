import { createStore } from 'zustand'

import { withSetter } from './'

type Store = {
  count: number
  nested: {
    count: number
  }
}

const store = createStore(
  withSetter<Store>(() => {
    return {
      count: 0,
      nested: {
        count: 0,
      },
    }
  }),
)

const { set, reset } = store.getState()

store.subscribe((state) => console.log(state))

set('nested.count', 1)
set({
  count: 5,
  nested: {
    count: 5,
  },
})

set((prev) => ({ ...prev, count: prev.count + 1 }))

set('nested.count', 2)
set('nested.count', (prev) => prev + 1)

reset('nested.count')
