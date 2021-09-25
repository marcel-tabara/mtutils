import { GenericForm } from '@mtutils/genericform/src/GenericForm'
import { SchemaType } from '@mtutils/genericform/src/GenericForm/types'
import { Meta } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'

export default {
  title: '@mtutils/genericForm',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'nextSeo',
          'gatsbyNextSeo_AllSeoProps',
          'gatsbyNextSeo_CourseJsonLdProps',
          'gatsbyNextSeo_FAQJsonLdProps',
          'gatsbyNextSeo_LogoJsonLdProps',
          'gatsbyNextSeo_ProductJsonLdProps',
          'gatsbyNextSeo_SocialProfileJsonLdProps',
          'gatsbyNextSeo_LocalBusinessAddress',
          'gatsbyNextSeo_CorporateContactJsonLdProps',
          'gatsbyNextSeo_BreadcrumbJsonLdProps',
          'gatsbyNextSeo_BlogJsonLdProps',
          'reactHelmet',
          'rjsf_string',
          'rjsf_object',
          'rjsf_number',
          'rjsf_array',
        ],
      },
    },
    schema: {
      control: {
        type: 'object',
      },
    },
    initialData: {
      control: {
        type: 'object',
      },
      onChange: { action: 'clicked' },
    },
  },
} as Meta

export const basic = (args: {
  initialData?: object
  schema?: JSONSchema7
  type?: SchemaType
  onChange: (val: any) => void
}) => (
  <GenericForm<object>
    initialData={args.initialData}
    schema={args.schema}
    type={args.type}
    onChange={(data) => console.log('data: ', data)}
  />
)
