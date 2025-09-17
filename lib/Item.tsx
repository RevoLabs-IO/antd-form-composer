import {
  Col,
  ColProps,
  Form,
  FormInstance,
  FormListFieldData,
  FormProps,
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { useCallback, useMemo } from 'react';

import { get, isEmpty } from './helper';
import { registeredComponents } from './register-component';
import { AnyObject, FormComposerItemType } from './types';

/**
 * Determines the React component to render for a given form item type.
 * Handles special cases like 'hidden' and 'custom' types, and falls back
 * to registered components or a default error message.
 *
 * @param item - The form item configuration
 * @returns The React component to render for the input
 */
const getInputComponent = (item: FormComposerItemType) => {
  if (item.type === 'hidden') {
    return () => null;
  }

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

/**
 * Props for the FormComposerItem component.
 */
export type FormComposerItemProps = {
  /** Root name path for nested forms */
  root?: NamePath;
  /** Configuration for the form item */
  itemConfig: FormComposerItemType;
  /** Name path for dynamic list */
  dynamicListName?: NamePath;
  /** Configuration for dynamic list field */
  dynamicListConfig?: FormListFieldData;
  /** Layout type for the form */
  layout: FormProps['layout'];
};

/**
 * Computes dynamic properties for a form item based on form instance and values.
 * Handles functions that depend on form state.
 *
 * @param item - The form item configuration
 * @param form - The form instance
 * @param values - Current form values
 * @returns Object with computed hidden, itemProps, inputProps, and col
 */
const computeDynamicProps = (
  item: FormComposerItemType,
  form: FormInstance<AnyObject>,
  values: AnyObject,
) => {
  const hidden =
    typeof item.hidden === 'function' ? item.hidden(form, values) : item.hidden;

  const itemProps =
    typeof item.itemProps === 'function'
      ? item.itemProps(form, values)
      : item.itemProps;

  const inputProps =
    typeof item.inputProps === 'function'
      ? item.inputProps(form, values)
      : item.inputProps;

  const col =
    typeof item.col === 'function' ? item.col(form, values) : item.col;

  return { hidden, itemProps, inputProps, col };
};

/**
 * FormComposerItem renders a single form item based on its configuration.
 * Handles dynamic properties, conditional rendering, and layout.
 *
 * @param props - The props for the FormComposerItem component
 * @returns The rendered form item or null if hidden
 */
export const FormComposerItem: React.FC<FormComposerItemProps> = (props) => {
  const { itemConfig, dynamicListConfig, dynamicListName, root, layout } =
    props;

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

  /**
   * Renders the form item content based on the item configuration and form state.
   * Handles dynamic properties, name path construction, and conditional rendering.
   *
   * @param item - The form item configuration
   * @param form - Optional form instance for dynamic properties
   * @returns The rendered form item content or null if hidden
   */
  const renderFormItem = useCallback(
    (item: FormComposerItemType, form?: FormInstance<AnyObject>) => {
      const {
        name: dynamicListFieldName,
        key: dynamicListFieldKey,
        ...dynamicListFieldRest
      } = dynamicListConfig || {};

      // Build context name path for nested structures
      let contextNamePath: NamePath[] = [];
      if (Array.isArray(dynamicListName)) {
        contextNamePath = [...dynamicListName];
      }
      const newRootNamePath = [...(root || []), ...contextNamePath];

      // Get current form values for dynamic properties
      const formValues = form?.getFieldsValue() || {};
      const values = contextNamePath?.length
        ? (get(
            formValues,
            [...newRootNamePath, dynamicListFieldName]
              .filter((path) => path !== undefined)
              .join('.'),
          ) as AnyObject)
        : formValues;

      // Compute dynamic properties if form is available
      const { hidden, itemProps, inputProps, col } = form
        ? computeDynamicProps(item, form, values)
        : {
            hidden: item.hidden,
            itemProps: item.itemProps,
            inputProps: item.inputProps,
            col: item.col,
          };

      if (hidden) {
        return null;
      }

      let content: React.ReactNode;

      if (isEmpty(itemProps)) {
        content = <InputComponent {...inputProps} />;
      } else {
        let itemNamePath: NamePath[] = [dynamicListFieldName];

        if (Array.isArray(itemProps.name)) {
          itemNamePath = [...itemNamePath, ...itemProps.name];
        } else {
          itemNamePath = [...itemNamePath, itemProps.name];
        }

        itemNamePath = itemNamePath.filter((path) => path !== undefined);

        content = (
          <Form.Item
            {...itemProps}
            {...(dynamicListFieldRest || {})}
            key={dynamicListFieldKey}
            name={itemNamePath}
          >
            <InputComponent
              {...inputProps}
              name={itemNamePath}
              root={newRootNamePath}
            />
          </Form.Item>
        );
      }

      if (layout === 'inline') {
        return content;
      }

      const colProps: ColProps =
        typeof col === 'object'
          ? (col as ColProps)
          : { span: (col as number | string) || 24 };

      return <Col {...colProps}>{content}</Col>;
    },
    [InputComponent, dynamicListConfig, dynamicListName, layout, root],
  );

  // If the item has dynamic properties, wrap in Form.Item with shouldUpdate
  if (shouldUpdate) {
    return (
      <Form.Item shouldUpdate noStyle>
        {(form) => renderFormItem(itemConfig, form as FormInstance<AnyObject>)}
      </Form.Item>
    );
  }

  return renderFormItem(itemConfig);
};
