import { GenericFormSchemas } from '@mtutils/jsonschema-collection'
import { TreeList } from '@mtutils/tree/src/index'
import { TreeListItemType } from '@mtutils/tree/src/types/types'
import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { withInfo } from '@storybook/addon-info'
import { Meta } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'

export default {
  title: '@mtutils/treelist',
  component: TreeList,
  decorators: [withInfo],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    label: { control: 'text' },
  },
} as Meta

export const basic = () => {
  const blockIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.23442 17.8482L7.61748 16.9245C7.734 16.9728 7.86257 17 8 17H9V18H8C7.72882 18 7.47024 17.946 7.23442 17.8482ZM15 18V17H16C16.1374 17 16.266 16.9728 16.3825 16.9245L16.7656 17.8482C16.5298 17.946 16.2712 18 16 18H15ZM18 9H17V8C17 7.86257 16.9728 7.734 16.9245 7.61748L17.8482 7.23442C17.946 7.47024 18 7.72882 18 8V9ZM9 6H8C7.72882 6 7.47024 6.05397 7.23442 6.15176L7.61748 7.07549C7.734 7.02717 7.86257 7 8 7H9V6ZM6 15H7V16C7 16.1374 7.02717 16.266 7.07549 16.3825L6.15176 16.7656C6.05397 16.5298 6 16.2712 6 16V15ZM6 13H7V11H6V13ZM6 9H7V8C7 7.86257 7.02717 7.734 7.07549 7.61748L6.15176 7.23442C6.05397 7.47024 6 7.72882 6 8V9ZM11 6V7H13V6H11ZM15 6V7H16C16.1374 7 16.266 7.02717 16.3825 7.07549L16.7656 6.15176C16.5298 6.05397 16.2712 6 16 6H15ZM18 11H17V13H18V11ZM18 15H17V16C17 16.1374 16.9728 16.266 16.9245 16.3825L17.8482 16.7656C17.946 16.5298 18 16.2712 18 16V15ZM13 18V17H11V18H13Z"
        fill="black"
        fillOpacity="0.5"
      />
    </svg>
  )

  // const textIcon = (
  //   <svg
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8Z"
  //       fill="black"
  //       fillOpacity="0.1"
  //     />
  //     <path
  //       d="M10.184 9.896H12.052V15H12.796V9.896H14.56V9.216H10.184V9.896Z"
  //       fill="black"
  //     />
  //   </svg>
  // )

  const openIcon = (
    <svg viewBox="0 0 20 20">
      <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
    </svg>
  )
  const closeIcon = (
    <svg viewBox="0 0 20 20">
      <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
    </svg>
  )
  const divLabel = (
    <span style={{ fontFamily: 'Arial', fontSize: 12 }}>Div</span>
  )
  const spanLabel = (
    <span style={{ fontFamily: 'Arial', fontSize: 12 }}>Span</span>
  )

  const initialData: TreeListItemType[] = [
    {
      //label: divLabel,
      open: true,
      data: { test: 1, title: 'aaa' } as JSONSchema7,
      schema: GenericFormSchemas[`rjsf_string`].definitions['String'],
      children: [
        {
          //label: divLabel,
          open: true,
          data: { title: 'bbb', test: 2 } as JSONSchema7,
          schema: GenericFormSchemas[`rjsf_object`].definitions['Object'],
          children: [
            {
              //label: divLabel,
              open: true,
              schema: GenericFormSchemas[`rjsf_number`].definitions['Number'],
              data: { title: 'ccc', test: 3 } as JSONSchema7,
              children: [],
            },
          ],
        },
      ],
    },
    {
      // label: spanLabel,
      // icon: textIcon,
      open: true,
      schema: GenericFormSchemas[`rjsf_array`].definitions['Array'],
      data: { title: 'ddd', test: 4 } as JSONSchema7,
    },
  ]

  const [data, setData] = useState<TreeListItemType<typeof initialData>[]>(
    initialData,
  )
  console.log('########## data', data)
  //console.log('########## js2jsonSchema(data)', js2jsonSchema(data))
  return (
    <TreeList
      data={data}
      onChange={setData}
      defaults={{
        open: true,
        arrow: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        // icon: textIcon,
      }}
    />
  )
}
