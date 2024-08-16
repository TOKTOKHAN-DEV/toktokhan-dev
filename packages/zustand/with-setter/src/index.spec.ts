import { cloneDeep } from 'lodash'
import { StoreApi, createStore } from 'zustand'

import { IWithSetter, withSetter } from './'

// Define a sample state type for testing with nested object
type SampleState = {
  count: number
  name: string
  nested: {
    count: number
  }
}

// Create an initializer function for the store
const initializer = (): SampleState => ({
  count: 0,
  name: 'initial',
  nested: {
    count: 0,
  },
})

// Create the store with the withSetter middleware
const useStore = createStore(withSetter<SampleState>(initializer))

describe('withSetter', () => {
  let store: StoreApi<IWithSetter<SampleState>>

  beforeEach(() => {
    // Initialize the store before each test
    store = useStore
    store.setState(cloneDeep(initializer()))
  })

  it('should initialize with the correct initial state', () => {
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('initial')
    expect(state.nested.count).toBe(0)
  })

  it('should update state correctly using set with partial state', () => {
    store.getState().set({ count: 5 })
    const state = store.getState()
    expect(state.count).toBe(5)
    expect(state.name).toBe('initial')
    expect(state.nested.count).toBe(0)
  })

  it('should update state correctly using set with key and value', () => {
    store.getState().set('name', 'updated')
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('updated')
    expect(state.nested.count).toBe(0)
  })

  it('should update nested state correctly using set with key and value', () => {
    store.getState().set('nested.count', 5)
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('initial')
    expect(state.nested.count).toBe(5)
  })

  it('should update nested state correctly using set with function', () => {
    store.getState().set('nested.count', (prev) => prev + 1)
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('initial')
    expect(state.nested.count).toBe(1)
  })

  it('should reset state to initial values', () => {
    store.getState().set({ count: 5, name: 'changed', nested: { count: 3 } })
    store.getState().reset()
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('initial')
    expect(state.nested.count).toBe(0)
  })

  it('should reset specific field to initial value', () => {
    store.getState().set({ count: 5, name: 'changed', nested: { count: 3 } })
    store.getState().reset('nested.count')
    const state = store.getState()
    expect(state.count).toBe(5)
    expect(state.name).toBe('changed')
    expect(state.nested.count).toBe(0)
  })

  it('should reset with partial state function', () => {
    store.getState().set({ count: 5, name: 'changed', nested: { count: 3 } })
    store.getState().reset((prev) => ({ name: prev.name + ' reset' }))
    const state = store.getState()
    expect(state.count).toBe(0)
    expect(state.name).toBe('initial reset')
    expect(state.nested.count).toBe(0)
  })
})
