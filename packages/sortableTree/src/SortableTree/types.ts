import { JSONSchema7 } from 'json-schema';

export interface SortableTreeProps {
  data?: object;
  schema?: JSONSchema7;
  type?: string;
  onChange?: (val: any) => void;
}
