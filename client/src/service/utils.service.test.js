import { describe, expect, it } from 'vitest'
import { adaptTableRowToObject, isEmptyObject, isOfType } from './utils.service'

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    const obj = {}
    expect(isEmptyObject(obj)).toBe(true)
  })

  it('should return false for a non-empty object', () => {
    const obj = { key: 'value' }
    expect(isEmptyObject(obj)).toBe(false)
  })

  it('should return false for null', () => {
    const obj = null
    expect(isEmptyObject(obj)).toBe(false)
  })

  it('should return false for a non-object value', () => {
    const obj = 'string'
    expect(isEmptyObject(obj)).toBe(false)
  })
})

describe('isOfType', () => {
  class TestClass {}

  it('should return true for an object of the specified type', () => {
    const obj = new TestClass()
    expect(isOfType(obj, TestClass)).toBe(true)
  })

  it('should return false for an object of a different type', () => {
    const obj = {}
    expect(isOfType(obj, TestClass)).toBe(false)
  })

  it('should return false for a non-object value', () => {
    const obj = 'string'
    expect(isOfType(obj, TestClass)).toBe(false)
  })
})

describe('adaptTableRowToObject', () => {
  it('should return the rest of the row object excluding isNew and id properties', () => {
    const row = {
      isNew: false,
      id: 1,
      name: 'John Doe',
      age: 30,
    }
    const expected = {
      name: 'John Doe',
      age: 30,
    }
    expect(adaptTableRowToObject(row)).toEqual(expected)
  })
})
