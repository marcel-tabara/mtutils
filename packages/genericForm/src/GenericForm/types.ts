type SchemaType = 'nextSeo' | 'gatsbyNextSeo'

export interface GenericFormProps {
  initialData?: {}
  schema?: string
  type?: SchemaType
  onChange?: (val) => void
}
