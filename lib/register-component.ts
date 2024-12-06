import { Checkbox, Input } from 'antd';
import React from 'react';

import { FormComposerList } from './List';
import { AnyObject } from './types';

export const registeredComponents: Record<
  string,
  React.ComponentType<AnyObject>
> = {};

export const registerInputComponents = (components: AnyObject): void => {
  Object.keys(components).forEach((name) => {
    const component = components[name];
    if (registeredComponents[name]) {
      console.warn(`Input [${name}] already existed.`);
    }
    registeredComponents[name] = component;
  });
};

registerInputComponents({
  text: Input,
  textarea: Input.TextArea,
  checkbox: Checkbox,
  list: FormComposerList,
});
