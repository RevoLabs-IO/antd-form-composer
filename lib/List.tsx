import { Form, FormListFieldData, FormListOperation, RowProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { Fragment } from 'react';

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

export const FormComposerList: React.FC<FormComposerListProps> = (props) => {
  const { name: fieldName, items, rowProps, listRender, itemRender } = props;

  return (
    <Form.List name={fieldName}>
      {(fields, operation) => {
        const fieldItems = fields.map((field) => {
          const itemsContent = (
            <FormComposerItems
              rowProps={rowProps}
              parentFieldName={fieldName}
              listConfig={field}
              items={items}
            />
          );

          if (typeof itemRender === 'function') {
            return (
              <Fragment key={field.key}>
                {itemRender(itemsContent, field, operation)}
              </Fragment>
            );
          }

          return <Fragment key={field.key}>{itemsContent}</Fragment>;
        });

        if (typeof listRender === 'function') {
          return listRender(fieldItems, fields, operation);
        }

        return fieldItems;
      }}
    </Form.List>
  );
};
