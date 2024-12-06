import type {
  AutoCompleteProps,
  CheckboxProps,
  ColProps,
  DatePickerProps,
  FormInstance,
  FormItemProps,
  InputNumberProps,
  SelectProps,
  SwitchProps,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { InputProps, PasswordProps, TextAreaProps } from 'antd/es/input';
import { JSX, ReactNode } from 'react';

import { FormComposerListProps } from './List';

export type ColSpanType = number | string | ColProps;

export type AnyObject = Record<string, any>; //eslint-disable-line

interface FormItemBase {
  col: ((form: FormInstance, values: AnyObject) => ColSpanType) | ColSpanType;
  itemProps:
    | ((form: FormInstance, values: AnyObject) => FormItemProps)
    | FormItemProps;
  hidden?: ((form: FormInstance, values: AnyObject) => boolean) | boolean;
}

interface FormItemInput extends FormItemBase {
  type: 'text';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => InputProps)
    | InputProps;
}

interface FormAutoComplete extends FormItemBase {
  type: 'autocomplete';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AutoCompleteProps)
    | AutoCompleteProps;
}

interface FormItemNumber extends FormItemBase {
  type: 'number';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => InputNumberProps)
    | InputNumberProps;
}

interface FormItemSwitch extends FormItemBase {
  type: 'switch';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => SwitchProps)
    | SwitchProps;
}

interface FormItemSelect extends FormItemBase {
  type: 'select';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => SelectProps)
    | SelectProps;
}

interface FormItemPassword extends FormItemBase {
  type: 'password';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => PasswordProps)
    | PasswordProps;
}

interface FormItemTextarea extends FormItemBase {
  type: 'textarea';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => TextAreaProps)
    | TextAreaProps;
}

interface FormItemDatePicker extends FormItemBase {
  type: 'date-picker';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => DatePickerProps)
    | DatePickerProps;
}

interface FormItemDateRangePicker extends FormItemBase {
  type: 'range-picker';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => RangePickerProps)
    | RangePickerProps;
}

interface FormItemCheckbox extends FormItemBase {
  type: 'checkbox';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => CheckboxProps)
    | CheckboxProps;
}

interface FormItemCustom extends FormItemBase {
  type: 'custom';
  component?: (props: AnyObject) => JSX.Element | ReactNode;
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

interface FormItemHidden extends FormItemBase {
  type: 'hidden';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

interface FormListItem extends FormItemBase {
  type: 'list';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => FormComposerListProps)
    | FormComposerListProps;
}

interface FormItemDynamic extends FormItemBase {
  type: string;
  component?: (props: AnyObject) => JSX.Element | ReactNode;
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

export type FormComposerItemType =
  | FormAutoComplete
  | FormItemNumber
  | FormItemInput
  | FormItemSwitch
  | FormItemTextarea
  | FormItemPassword
  | FormItemDatePicker
  | FormItemDateRangePicker
  | FormItemSelect
  | FormItemCheckbox
  | FormListItem
  | FormItemCustom
  | FormItemHidden
  | FormItemDynamic;
