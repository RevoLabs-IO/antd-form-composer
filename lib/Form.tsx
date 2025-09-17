import { Form, FormProps } from 'antd';
import React from 'react';

import { FormComposerItems, FormComposerItemsProps } from './Items';

/**
 * Props for the FormComposer component.
 * Extends Ant Design's FormProps with additional properties for form items and layout.
 */
interface FormComposerProps extends FormProps {
  /** Array of form items to render */
  items: FormComposerItemsProps['items'];
  /** Props for the Row component wrapping the items */
  rowProps?: FormComposerItemsProps['rowProps'];
  /** Additional children to render inside the form */
  children?: React.ReactNode;
}

/**
 * FormComposer is a wrapper around Ant Design's Form component that simplifies
 * form creation by accepting an array of item configurations.
 *
 * @param props - The props for the FormComposer component
 * @returns The rendered Form component with FormComposerItems
 */
export const FormComposer: React.FC<FormComposerProps> = (props) => {
  const { items, rowProps, children, ...formProps } = props;

  return (
    <Form {...formProps}>
      {items ? (
        <FormComposerItems
          items={items}
          rowProps={rowProps}
          layout={formProps.layout || 'horizontal'}
        />
      ) : null}
      {children}
    </Form>
  );
};
