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
  const items = useMemo(() => {
    return [
      {
        col: 24,
        type: 'text',
        hidden: false,
        itemProps: {
          label: 'Text input',
          name: 'name',
        },
      },
      {
        col: 24,
        type: 'text',
        hidden: false,
        itemProps: {
          label: 'Text input',
          name: ['nested', 'first'],
        },
      },
      {
        col: 24,
        type: 'text',
        hidden: false,
        itemProps: {
          label: 'Text input',
          name: ['nested', 'second'],
        },
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
          label: 'complex-dynamic',
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
                label: 'items',
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
                        Remove Sub Item
                      </Button>
                    </>
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
                    hidden: (_form: FormInstance, values: any) => { //eslint-disable-line
                      return values?.name === 'ok';
                    },
                    itemProps: {
                      name: 'children',
                      label: 'children',
                    },
                    inputProps: {
                      items: [
                        {
                          type: 'text',
                          itemProps: {
                            label: 'First',
                            name: 'first',
                          },
                        },
                        {
                          type: 'number',
                          itemProps: {
                            label: 'Second',
                            name: 'second',
                          },
                          hidden: (_form: FormInstance, values: any) => { //eslint-disable-line
                            // console.log(values);
                            return values?.first === 'hidden';
                          },
                        },
                      ],
                      listRender: (content, _fields, operation) => {
                        return (
                          <>
                            {content}
                            <Button
                              type="dashed"
                              onClick={() => operation.add()}
                              block
                            >
                              + Add sub sub Item
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
                                Remove sub sub
                              </Button>
                            }
                          >
                            {content}
                          </Card>
                        );
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ] as FormComposerItemType[];
  }, []);

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
