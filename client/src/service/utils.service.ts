import { GridRowModel } from '@mui/x-data-grid'

type EmptyObject = {}
export function isEmptyObject(obj: unknown): obj is EmptyObject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj as object).length === 0
  )
}

export function isOfType<T>(obj: any, type: { new (): T }): obj is T {
  return typeof obj === 'object' && obj instanceof type
}

export function adaptTableRowToObject<T>(row: GridRowModel): T {
  const { isNew, id, ...rest } = row
  return rest as T
}
