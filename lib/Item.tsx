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
  parentFieldName?: NamePath;
  listConfig?: FormListFieldData;
};

export const FormComposerItem: React.FC<FormComposerItemProps> = (props) => {
  const { itemConfig, listConfig, parentFieldName } = props;

  const InputComponent = useMemo(
    () => getInputComponent(itemConfig),
    [itemConfig],
  );

  const shouldUpdate =
    typeof itemConfig.hidden === 'function' ||
    typeof itemConfig.col === 'function' ||
    typeof itemConfig.itemProps === 'function' ||
    typeof itemConfig.inputProps === 'function' ||
    itemConfig?.itemProps?.shouldUpdate;

  const renderFormItem = useCallback(
    (item: FormComposerItemType, form?: FormInstance<AnyObject>) => {
      let content;

      const {
        name: listFieldName,
        key: listFieldKey,
        ...listFieldRest
      } = listConfig || {};

      let hidden = item.hidden;
      let itemProps = item.itemProps;
      let inputProps = item.inputProps;
      let col = item.col as ColSpanType;

      let contextNamePath: NamePath[] = [];

      if (Array.isArray(parentFieldName)) {
        contextNamePath = [...parentFieldName];
      }

      contextNamePath.push(listFieldName);

      contextNamePath = contextNamePath.filter((path) => path !== undefined);

      if (form) {
        const formValues = form?.getFieldsValue() || {};

        const values = contextNamePath?.length
          ? (get(formValues, contextNamePath?.join('.')) as AnyObject)
          : formValues;

        console.log('form values: ', formValues);
        console.log('context path: ', contextNamePath);
        console.log('context values: ', values);

        hidden =
          typeof item.hidden === 'function' && form
            ? item.hidden(form, values)
            : item.hidden;

        if (hidden) {
          return null;
        }

        itemProps =
          typeof item.itemProps === 'function' && form
            ? item.itemProps(form, values)
            : item.itemProps;

        inputProps =
          typeof item.inputProps === 'function' && form
            ? item.inputProps(form, values)
            : item.inputProps;

        col = (
          typeof item.col === 'function' && form
            ? item.col(form, values)
            : item.col
        ) as ColSpanType;
      }

      if (hidden) {
        return null;
      }

      if (isEmpty(itemProps)) {
        content = <InputComponent {...inputProps} />;
      } else {
        let itemNamePath: NamePath[] = [listFieldName];

        if (Array.isArray(itemProps.name)) {
          itemNamePath = [...itemNamePath, ...itemProps.name];
        } else {
          itemNamePath = [...itemNamePath, itemProps.name];
        }

        itemNamePath = itemNamePath.filter((path) => path !== undefined);

        console.log(listFieldName);

        content = (
          <Form.Item
            key={listFieldKey}
            {...itemProps}
            {...(listFieldRest || {})}
            name={itemNamePath}
          >
            <InputComponent {...inputProps} name={itemNamePath} />
          </Form.Item>
        );
      }

      return (
        <Col {...(typeof col === 'object' ? col : { span: col || 24 })}>
          {content}
        </Col>
      );
    },
    [InputComponent, listConfig, parentFieldName],
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
