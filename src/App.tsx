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
    (_form: FormInstance, values: FormValues) => {
      console.log(values);
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
        hidden: true,
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
        hidden: true,
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
                label: 'First',
                name: 'first',
              },
            },
            {
              col: {
                xs: 24,
                md: 8,
              },
              type: 'number',
              itemProps: {
                label: 'Second',
                name: 'second',
              },
            },
          ],
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
        },
      },
      {
        type: 'list',
        col: 24,
        // hidden: true,
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
              },
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
                      name: 'first',
                    },
                    inputProps: renderInputProps,
                  },
                  {
                    type: 'number',
                    itemProps: {
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
