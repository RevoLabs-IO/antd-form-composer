import { Form, FormListFieldData, FormListOperation, RowProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { Fragment } from 'react';

import { FormComposerItems } from './Items';
import type { FormComposerItemType } from './types';

/**
 * Props for the FormComposerList component.
 */
export interface FormComposerListProps {
  /** Name path for the list field */
  name: NamePath;
  /** Props for the Row component in items */
  rowProps?: RowProps;
  /** Array of form item configurations for each list item */
  items: FormComposerItemType[];
  /**
   * Custom render function for the entire list.
   * Receives the rendered field items, fields array, and operation object.
   */
  listRender: (
    content: React.ReactNode,
    fields: FormListFieldData[],
    operation: FormListOperation,
  ) => React.ReactNode;
  /**
   * Custom render function for each list item.
   * Receives the item content, field data, and operation object.
   */
  itemRender: (
    content: React.ReactNode,
    field: FormListFieldData,
    operation: FormListOperation,
  ) => React.ReactNode;
  /** Root name path for nested forms */
  root?: NamePath;
}

/**
 * FormComposerList renders a dynamic list of form items using Ant Design's Form.List.
 * Allows custom rendering for the list container and individual items.
 *
 * @param props - The props for the FormComposerList component
 * @returns The rendered dynamic list
 */
export const FormComposerList: React.FC<FormComposerListProps> = React.memo(
  (props) => {
    const {
      name: fieldName,
      items,
      rowProps,
      listRender,
      itemRender,
      root,
    } = props;

    return (
      <Form.List name={fieldName}>
        {(fields, operation) => {
          // Render each field in the list
          const fieldItems = fields.map((field) => {
            const itemsContent = (
              <FormComposerItems
                root={root}
                rowProps={rowProps}
                dynamicListName={fieldName}
                dynamicListConfig={field}
                items={items}
              />
            );

            // Use custom item render if provided, otherwise return content directly
            if (typeof itemRender === 'function') {
              return (
                <Fragment key={field.key}>
                  {itemRender(itemsContent, field, operation)}
                </Fragment>
              );
            }

            return <Fragment key={field.key}>{itemsContent}</Fragment>;
          });

          // Use custom list render if provided, otherwise return field items
          if (typeof listRender === 'function') {
            return listRender(fieldItems, fields, operation);
          }

          return <>{fieldItems}</>;
        }}
      </Form.List>
    );
  },
);
