type SchemaType = 'nextSeo' | 'other'

export interface GenericFormProps {
  initialData?: {}
  schema?: string
  type?: SchemaType
  onChange?: (val) => void
}
