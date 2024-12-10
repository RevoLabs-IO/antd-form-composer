# Antd Form Composer

A powerful and flexible form composition library for React applications, built on top of Ant Design Form. It provides an
intuitive way to create complex forms with dynamic rendering and configuration.

## ✨ Features

- 🔄 Dynamic form fields with flexible configurations
- 🎨 Built-in support for common Ant Design form components
- 📝 Form list support for repeatable fields
- 🎭 Conditional Rendering: Hide or modify form fields based on runtime conditions
- 🧩 Custom component integration
- 🔍 TypeScript support with full type definitions

## 📦 Installation

```bash
npm install antd-form-composer
# or
yarn add antd-form-composer
# or
pnpm install antd-form-composer
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const App = () => {
  const items = [
    {
      type: 'text',
      col: 12,
      itemProps: {
        label: 'Username',
        name: 'username',
        rules: [{ required: true }],
      },
      inputProps: {
        placeholder: 'Enter username',
      },
    },
    {
      type: 'password',
      col: 12,
      itemProps: {
        label: 'Password',
        name: 'password',
        rules: [{ required: true }],
      },
      inputProps: {
        placeholder: 'Enter password',
      },
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```

### Form Lists

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const DynamicUserForm = () => {
  const items = [
    {
      type: 'list',
      name: 'users',
      listRender: (fieldItems, fields, { add, remove }) => (
        <div>
          {fieldItems}
          <button onClick={() => add()}>Add User</button>
        </div>
      ),
      itemRender: (itemContent, field, { remove }) => (
        <div>
          {itemContent}
          <button onClick={() => remove(field.name)}>Remove</button>
        </div>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'First Name' },
          inputProps: { placeholder: 'Enter first name' }
        },
        {
          type: 'text',
          itemProps: { label: 'Last Name' },
          inputProps: { placeholder: 'Enter last name' }
        }
      ]
    }
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```


### Nested Form Lists

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const NestedCompanyForm = () => {
  const items = [
    {
      type: 'list',
      name: 'departments',
      listRender: (fieldItems, fields, { add, remove }) => (
        <div>
          {fieldItems}
          <button onClick={() => add()}>Add department</button>
        </div>
      ),
      itemRender: (itemContent, field, { remove }) => (
        <div>
          {itemContent}
          <button onClick={() => remove(field.name)}>Remove</button>
        </div>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'Department Name', name: 'name' },
        },
        {
          type: 'list',
          name: 'employees',
          listRender: (fieldItems, fields, { add, remove }) => (
            <div>
              {fieldItems}
              <button onClick={() => add()}>Add employee</button>
            </div>
          ),
          itemRender: (itemContent, field, { remove }) => (
            <div>
              {itemContent}
              <button onClick={() => remove(field.name)}>Remove</button>
            </div>
          ),
          items: [
            {
              type: 'text',
              itemProps: { label: 'Employee Name', name: 'name' },
            },
            {
              type: 'text',
              itemProps: { label: 'Position', name: 'position' },
            },
          ],
        },
      ],
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```

## 🧩 Component registration

This library comes with a carefully selected set of pre-registered components:

- `text`: Ant Design Input
- `textarea`: Ant Design Input.TextArea
- `checkbox`: Ant Design Checkbox
- `list`: Dynamic Form List

### Registering Additional Components

You can easily register additional components based on your needs:

```typescript
import { registerInputComponents } from 'antd-form-composer';
import { DatePicker, Select, InputNumber } from 'antd';

registerInputComponents({
  'date-picker': DatePicker,
  select: Select,
  number: InputNumber,
  // Add more components as needed
});
```


### Why Limited Pre-registered Components?

We intentionally limit pre-registered components for several important reasons:

1. **Performance Optimization**

- Reduces initial bundle size
- Allows tree-shaking for unused components
- Minimizes memory footprint

3. **Flexibility**

- You can register your optimized components
- Allows custom styling and behavior
- Supports project-specific requirements

## 📖 API Reference

### FormComposerProps

| Property | Type                                                 | Description                             |
|----------|------------------------------------------------------|-----------------------------------------|
| `items`  | `FormComposerItem[]`                                 | Array of form items to render           |
| `...`    | [FormProps](https://ant.design/components/form#form) | All Ant Design Form props are supported |

### FormComposerItemsProps

| Property | Type                                               | Description                                                                                                                   |
|----------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `items`  | `FormComposerItem[]`                               | Array of form items to render                                                                                                 |
| rowProps | [RowProps](https://ant.design/components/grid#row) | Configuration for grid columns, with full support for all [Ant Design Row](https://ant.design/components/grid#row) properties |

### FormComposerItem

Common properties for all item types:

| Property   | Type                                                 | Description                                                                                                                           |
|------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| type       | `string`                                             | Input component type (e.g., 'text', 'checkbox')                                                                                       |
| col        | `number \| ColProps \| ((form, values) => ColProps)` | Configuration for grid columns, with full support for all [Ant Design Column](https://ant.design/components/grid#col) properties      |
| itemProps  | `FormItemProps \| ((form, values) => FormItemProps)` | Configuration for form item, with full support for all [Ant Design Form.Item](https://ant.design/components/form#formitem) properties |
| hidden     | `boolean \| ((form, values) => boolean)`             | Conditionally hide the field                                                                                                          |
| inputProps | `object \| ((form, values) => object)`               | Props for the input component                                                                                                         |
