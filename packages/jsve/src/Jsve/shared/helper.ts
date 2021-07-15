import { changeNodeAtPath } from 'react-sortable-tree';
import {
  booleanWidgetEnum,
  stringWidgetEnumDefault,
  integerWidgetEnum,
} from '../shared/constants';

interface IIsPrimitive {
  (subtitle: string): boolean;
}
interface IGetTitleFromPath {
  (path: number[]): string;
}

export const isPrimitive: IIsPrimitive = (subtitle) =>
  ['String', 'Integer', 'Boolean', 'Number'].includes(subtitle);

const getTitleFromPath: IGetTitleFromPath = (path) =>
  path.toString().split(',').join('-');

export const externalNodeType = 'yourNodeType';
export const shouldCopyOnOutsideDrop = true;
export const getNodeKey = ({ treeIndex }) => treeIndex;

export const prepareFirst = (path, node, treeData) => {
  const { title, subtitle } = node;

  const newNode = {
    ...node,
    title:
      title.length > 0 && title.substring(0, 1) !== '0'
        ? title
        : getTitleFromPath(path),
    type: subtitle.toLowerCase(),
  };

  const newTree = changeNodeAtPath({
    treeData,
    path: path,
    getNodeKey,
    newNode,
  });

  return newTree;
};

const baseProps = [
  'title',
  'description',
  'defaultValue',
  'enumVal',
  'enumNames',
  'isRequired',
];

export const getUIOrder = (node) => {
  if (node.subtitle === 'String') {
    return ['format', 'pattern', 'minLength', 'maxLength'];
  } else if (node.subtitle === 'Number' || node.subtitle === 'Integer') {
    return [
      'minimum',
      'excludeMinimum',
      'maximum',
      'excludeMaximum',
      'multipleOf',
    ];
  } else if (node.subtitle === 'Array') {
    return ['title', 'description', 'minItems', 'maxItems', 'uniqueItems'];
  } else if (node.subtitle === 'Object') {
    return ['title', 'description'];
  } else {
    return [
      'title',
      'description',
      'defaultValue',
      'enumVal',
      'enumNames',
      'isRequired',
    ];
  }
};

export const getWidgetEnum = (currentType: string) => {
  switch (currentType) {
    case 'string':
      return stringWidgetEnumDefault;
    case 'boolean':
      return booleanWidgetEnum;
    case 'integer':
    case 'number':
      return integerWidgetEnum;
    default:
      return '';
  }
};
