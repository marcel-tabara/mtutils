type SchemaType =
  | 'nextSeo'
  | 'gatsbyNextSeo_AllSeoProps'
  | 'gatsbyNextSeo_CourseJsonLdProps'
  | 'gatsbyNextSeo_FAQJsonLdProps'
  | 'gatsbyNextSeo_LogoJsonLdProps'
  | 'gatsbyNextSeo_ProductJsonLdProps'
  | 'gatsbyNextSeo_SocialProfileJsonLdProps'
  | 'gatsbyNextSeo_LocalBusinessAddress'
  | 'gatsbyNextSeo_CorporateContactJsonLdProps'
  | 'gatsbyNextSeo_BreadcrumbJsonLdProps'
  | 'gatsbyNextSeo_BlogJsonLdProps';

export interface GenericFormProps {
  initialData?: {};
  schema?: string;
  type?: SchemaType;
  onChange?: (val) => void;
}
