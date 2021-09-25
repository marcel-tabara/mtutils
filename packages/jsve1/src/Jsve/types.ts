import { JSONSchema7 } from 'json-schema';

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
  | 'gatsbyNextSeo_BlogJsonLdProps'
  | 'reactHelmet'
  | 'rjsf_string'
  | 'rjsf_object'
  | 'rjsf_number'
  | 'rjsf_array';

export interface GenericFormProps {
  initialData?: JSONSchema7;
  schema?: string;
  type?: SchemaType;
  onChange?: (val: () => void) => void;
}
