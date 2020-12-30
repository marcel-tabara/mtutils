type SchemaType = 'seoNext' | 'other'

export interface GenericFormProps {
  initialData?: {}
  schema?: string
  type?: SchemaType
  cb?: () => void
}
