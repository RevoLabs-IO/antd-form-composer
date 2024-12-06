import { Col, Form, FormInstance, FormListFieldData } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { useCallback, useMemo } from 'react';

import { get, isEmpty } from './helper';
import { registeredComponents } from './register-component';
import { AnyObject, ColSpanType, FormComposerItemType } from './types';

const getInputComponent = (item: FormComposerItemType) => {
  if (item.type === 'custom') {
    return item.component || (() => <>Custom field is not implemented.</>);
  }

  return (
    registeredComponents[item.type] ||
    (() => (
      <>
        Input <strong>{item.type}</strong> is not registered
      </>
    ))
  );
};

export type FormComposerItemProps = {
  itemConfig: FormComposerItemType;
  listName?: NamePath;
  listConfig?: FormListFieldData;
};

export const FormComposerItem: React.FC<FormComposerItemProps> = (props) => {
  const { itemConfig, listConfig, listName } = props;

  const InputComponent = useMemo(
    () => getInputComponent(itemConfig),
    [itemConfig],
  );

  const shouldUpdate =
    typeof itemConfig.hidden === 'function' ||
    typeof itemConfig.col === 'function' ||
    typeof itemConfig.itemProps === 'function' ||
    typeof itemConfig.inputProps === 'function';

  const renderFormItem = useCallback(
    (item: FormComposerItemType, form?: FormInstance<AnyObject>) => {
      let content;

      const {
        name: listFieldName,
        key: listFieldKey,
        ...listFieldRest
      } = listConfig || {};

      const formValues = form?.getFieldsValue() || {};
      const values = listName
        ? (get(
            formValues,
            [...listName, listFieldName]?.join('.'),
          ) as AnyObject)
        : formValues;

      console.log(listName, listFieldName, values);

      const hidden =
        typeof item.hidden === 'function' && form
          ? item.hidden(form, values)
          : item.hidden;

      if (hidden) {
        return null;
      }

      const itemProps =
        typeof item.itemProps === 'function' && form
          ? item.itemProps(form, values)
          : item.itemProps;

      const inputProps =
        typeof item.inputProps === 'function' && form
          ? item.inputProps(form, values)
          : item.inputProps;

      const col = (
        typeof item.col === 'function' && form
          ? item.col(form, values)
          : item.col
      ) as ColSpanType;

      if (isEmpty(itemProps)) {
        content = <InputComponent {...inputProps} />;
      } else {
        const namePath = [
          listFieldName,
          ...(Array.isArray(itemProps.name)
            ? itemProps.name
            : [itemProps.name]),
        ].filter((path) => path !== undefined);

        content = (
          <Form.Item
            key={listFieldKey}
            {...itemProps}
            {...(listFieldRest || {})}
            name={namePath}
          >
            <InputComponent {...inputProps} name={namePath} />
          </Form.Item>
        );
      }

      return (
        <Col {...(typeof col === 'object' ? col : { span: col || 24 })}>
          {content}
        </Col>
      );
    },
    [InputComponent, listConfig, listName],
  );

  if (shouldUpdate) {
    return (
      <Form.Item shouldUpdate noStyle>
        {(form) => {
          return renderFormItem(itemConfig, form as FormInstance<AnyObject>);
        }}
      </Form.Item>
    );
  }

  return renderFormItem(itemConfig);
};
