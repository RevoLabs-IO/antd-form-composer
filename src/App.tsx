import {
  FormComposer,
  FormComposerItemType,
  registerInputComponents,
} from '@lib';
import {
  AutoComplete,
  Button,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
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
  const renderInputProps = useCallback(() => {
    return {
      placeholder: '',
    };
  }, []);

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
          label: 'Complex dynamic',
          name: 'complex-dynamic',
        },
        inputProps: {
          listRender: (content, _fields, operation) => {
            return (
              <>
                {content}
                <Button type="dashed" onClick={() => operation.add()} block>
                  + Add Item
                </Button>
              </>
            );
          },
          itemRender: (content, field, operation) => {
            return (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <Button
                    type="dashed"
                    onClick={() => operation.remove(field.name)}
                    block
                  >
                    Remove
                  </Button>
                }
              >
                {content}
              </Card>
            );
          },
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
                listRender: (content, _fields, operation) => {
                  console.log(operation);
                  return (
                    <>
                      {content}
                      <Button
                        type="dashed"
                        onClick={() => operation.add()}
                        block
                      >
                        + Add Sub Item
                      </Button>
                    </>
                  );
                },
                itemRender: (content, field, operation) => {
                  return (
                    <>
                      {content}
                      <Button
                        type="dashed"
                        onClick={() => operation.remove(field.name)}
                        block
                      >
                        Remove
                      </Button>
                    </>
                  );
                },
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="demo-form"
        items={items}
        layout="horizontal"
        initialValues={{}}
        onFinish={onSubmit}
      >
        <button type="submit">Submit</button>
      </FormComposer>
    </div>
  );
}

export default App;
