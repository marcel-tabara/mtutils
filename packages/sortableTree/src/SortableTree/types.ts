import { JSONSchema7 } from 'json-schema';

export interface SortableTreeProps {
  initialData?: object;
  schema?: JSONSchema7;
  type?: string;
  onChange?: (val) => void;
}
