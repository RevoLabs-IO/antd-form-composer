import { Button, Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { Fragment } from 'react';

import { FormComposerItems } from './Items';
import type { AnyObject, FormComposerItemType } from './types';

export interface FormComposerListProps {
  name: NamePath;
  items: FormComposerItemType[];
  initialValues: AnyObject;
}

export const FormComposerList: React.FC<FormComposerListProps> = ({
  name: fieldName,
  items,
  initialValues,
}) => {
  return (
    <Form.List name={fieldName}>
      {(listOfItems, { add, remove }) => {
        return (
          <>
            {listOfItems.map((field) => {
              return (
                <Fragment key={field.key}>
                  <FormComposerItems
                    listName={fieldName}
                    listConfig={field}
                    items={items}
                  />
                  <Button
                    type="primary"
                    danger
                    onClick={() => remove(field.name)}
                  >
                    Remove
                  </Button>
                </Fragment>
              );
            })}
            <Button onClick={() => add(initialValues || {})}>Add</Button>
            <Button onClick={() => add(initialValues || {}, 0)}>
              Add top top
            </Button>
          </>
        );
      }}
    </Form.List>
  );
};
