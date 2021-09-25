import { GenericForm } from '@mtutils/genericform/src/GenericForm'
import { GenericFormProps } from '@mtutils/genericform/src/GenericForm/types'
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
}

const Template = (args: GenericFormProps) => <GenericForm {...args} />

export const genericForm = Template.bind({})
