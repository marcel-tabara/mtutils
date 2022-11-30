import { AwsCli } from '@mtutils/aws-cli/src/AwsCli'
import { SchemaType } from '@mtutils/aws-cli/src/AwsCli/types'
import { Meta } from '@storybook/react'
import React from 'react'

export default {
  title: '@mtutils/aws-cli',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['accessanalyzer', 'account', 'acmpca'],
      },
    },
  },
} as Meta

export const basic = (args: {
  type?: SchemaType
  onChange: (val: any) => void
}) => (
  <AwsCli type={args.type} onChange={(data) => console.log('data: ', data)} />
)
