import { Form, FormListFieldData, FormListOperation, RowProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React from 'react';

import { FormComposerItems } from './Items';
import type { AnyObject, FormComposerItemType } from './types';

export interface FormComposerListProps {
  name: NamePath;
  rowProps?: RowProps;
  items: FormComposerItemType[];
  initialValues: AnyObject;
  listRender: (
    content: React.ReactNode,
    fields: FormListFieldData[],
    operation: FormListOperation,
  ) => React.ReactNode;
  itemRender: (
    content: React.ReactNode,
    field: FormListFieldData,
    operation: FormListOperation,
  ) => React.ReactNode;
}

export const FormComposerList: React.FC<FormComposerListProps> = ({
  name: fieldName,
  items,
  rowProps,
  listRender,
  itemRender,
}) => {
  return (
    <Form.List name={fieldName}>
      {(fields, operation) => {
        const fieldItems = fields.map((field) => {
          const itemsContent = (
            <FormComposerItems
              key={field.key}
              rowProps={rowProps}
              listName={fieldName}
              listConfig={field}
              items={items}
            />
          );

          if (typeof itemRender === 'function') {
            return itemRender(itemsContent, field, operation);
          }

          return itemsContent;
        });

        if (typeof listRender === 'function') {
          return listRender(fieldItems, fields, operation);
        }
        return fieldItems;
      }}
    </Form.List>
  );
};
