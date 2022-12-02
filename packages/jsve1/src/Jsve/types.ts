import { SchemaType } from '@mtutils/jsonschema-collection'
import { JSONSchema7 } from 'json-schema'

export interface GenericFormProps {
  initialData?: JSONSchema7
  schema?: string
  type?: SchemaType
  onChange?: (val: () => void) => void
}
