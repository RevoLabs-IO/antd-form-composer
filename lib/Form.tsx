import { Form, FormProps } from 'antd';
import React from 'react';

import { FormComposerItems, FormComposerItemsProps } from './Items';

interface FormComposerProps extends FormProps {
  items: FormComposerItemsProps['items'];
  rowProps?: FormComposerItemsProps['rowProps'];
  children?: React.ReactNode;
}

export const FormComposer: React.FC<FormComposerProps> = (props) => {
  const { items, rowProps, children, ...formProps } = props;

  return (
    <Form {...formProps}>
      {items ? <FormComposerItems items={items} rowProps={rowProps} /> : null}
      <>{children}</>
    </Form>
  );
};
