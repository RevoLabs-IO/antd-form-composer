import {
  AnyObject,
  FormComposer,
  FormComposerItemType,
  registerInputComponents,
} from '@lib';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  FormInstance,
  InputNumber,
  Mentions,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import { useCallback, useMemo } from 'react';

const components = {
  'auto-completed': AutoComplete,
  cascader: Cascader,
  'checkbox-group': Checkbox.Group,
  'date-picker': DatePicker,
  'range-picker': DatePicker.RangePicker,
  number: InputNumber,
  select: Select,
  switch: Switch,
  mentions: Mentions,
  rate: Rate,
  slider: Slider,
  'time-picker': TimePicker,
  'tree-select': TreeSelect,
};

registerInputComponents(components);

type FormValues = {
  name: string;
};

function App() {
  const renderInputProps = useCallback(
    (form: FormInstance, values: AnyObject) => {
      console.log(form, values);
      return {
        placeholder: '',
      };
    },
    [],
  );

  const items = useMemo(() => {
    return [
      {
        col: 24,
        type: 'text',
        itemProps: {
          label: 'Text input',
          name: 'name',
          required: true,
          rules: [{ required: true, message: 'Vui lòng nhập tên cấu hình' }],
        },
        inputProps: {},
      },
      {
        col: 24,
        type: 'text',
        itemProps: {
          label: 'test',
          name: 'dev',
          required: true,
          rules: [{ required: true, message: 'Vui lòng nhập tên cấu hình' }],
        },
        inputProps: {},
      },
      {
        type: 'list',
        col: 24,
        itemProps: {
          name: 'dynamic-form',
        },
        hidden: true,
        inputProps: {
          items: [
            {
              col: {
                xs: 24,
                md: 8,
              },
              type: 'text',
              itemProps: {
                label: 'Tên thiết bị',
                name: 'name',
                required: true,
                rules: [
                  { required: true, message: 'Vui lòng nhập tên thiết bị ' },
                ],
              },
              inputProps: renderInputProps,
            },
            {
              col: {
                xs: 24,
                md: 8,
              },
              type: 'number',
              itemProps: {
                label: 'Giá thuê',
                name: 'monthlyFee',
              },
              inputProps: {
                className: 'w-full',
                suffix: 'đ/tháng',
              },
            },
            {
              col: {
                xs: 24,
                md: 8,
              },
              type: 'number',
              itemProps: {
                label: 'Giá mua',
                name: 'ownershipFee',
              },
              inputProps: {
                className: 'w-full',
              },
            },
          ],
        },
      },
      {
        type: 'list',
        col: 24,
        itemProps: {
          name: 'complex-dynamic',
        },
        inputProps: {
          items: [
            {
              type: 'text',
              itemProps: {
                label: 'Name',
                name: 'name',
                required: true,
              },
              inputProps: renderInputProps,
            },
            {
              type: 'list',
              col: 24,
              itemProps: {
                name: 'items',
                label: 'List',
              },
              inputProps: {
                items: [
                  {
                    type: 'text',
                    itemProps: {
                      label: 'first',
                      name: 'first',
                    },
                    inputProps: renderInputProps,
                  },
                  {
                    type: 'number',
                    itemProps: {
                      label: 'second',
                      name: 'second',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ] as FormComposerItemType[];
  }, [renderInputProps]);

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values);
  }, []);

  return (
    <div className="App">
      <FormComposer
        name="demo-form"
        items={items}
        layout="vertical"
        initialValues={{}}
        onFinish={onSubmit}
      ></FormComposer>
    </div>
  );
}

export default App;
