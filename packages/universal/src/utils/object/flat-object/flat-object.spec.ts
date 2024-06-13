import { compact } from 'lodash'

import { flatObject } from './flat-object'

describe('flatObject', () => {
  it('should flatten the object with default settings', () => {
    const data = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA',
      },
    }
    const result = flatObject({}, data)

    expect(result).toEqual({
      name: 'John',
      age: 30,
      'address.city': 'New York',
      'address.country': 'USA',
    })
  })

  it('should flatten the object with custom settings', () => {
    const data = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA',
      },
    }

    const result = flatObject(
      {
        formatKey: (parentKey, currentKey) =>
          compact([parentKey, currentKey]).join('_'),
        isValueType: (value) => typeof value !== 'object',
        formatValue: ({ value }) => String(value).toUpperCase(),
      },
      data,
    )
    expect(result).toEqual({
      name: 'JOHN',
      age: '30',
      address_city: 'NEW YORK',
      address_country: 'USA',
    })
  })

  it('should work correctly in curried form', () => {
    const data = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA',
      },
    }

    const flattenWithCustomParams = flatObject({
      formatKey: (parentKey, currentKey) =>
        compact([parentKey, currentKey]).join('_'),
      isValueType: (value) => typeof value !== 'object',
      formatValue: ({ value }) => String(value).toUpperCase(),
    })
    const result = flattenWithCustomParams(data)

    expect(result).toEqual({
      name: 'JOHN',
      age: '30',
      address_city: 'NEW YORK',
      address_country: 'USA',
    })
  })
})
