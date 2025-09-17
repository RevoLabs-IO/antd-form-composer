import { Input } from 'antd';
import React from 'react';

import { FormComposerList } from './List';
import { AnyObject } from './types';

/**
 * Registry of input components mapped by type name.
 * Used by FormComposerItem to resolve component types.
 */
export const registeredComponents: Record<
  string,
  React.ComponentType<AnyObject>
> = {};

/**
 * Registers multiple input components at once.
 * Warns if a component type is already registered.
 *
 * @param components - Object mapping component type names to React components
 */
export const registerInputComponents = (components: AnyObject): void => {
  Object.keys(components).forEach((name) => {
    const component = components[name];
    if (registeredComponents[name]) {
      console.warn(`Input [${name}] already exists and will be overwritten.`);
    }
    registeredComponents[name] = component;
  });
};

/**
 * Registers a single input component.
 * Warns if the component type is already registered.
 *
 * @param name - The type name for the component
 * @param component - The React component to register
 */
export const registerInputComponent = (
  name: string,
  component: React.ComponentType<AnyObject>,
): void => {
  if (registeredComponents[name]) {
    console.warn(`Input [${name}] already exists and will be overwritten.`);
  }
  registeredComponents[name] = component;
};

// Register default components
registerInputComponents({
  text: Input,
  password: Input.Password,
  textarea: Input.TextArea,
  list: FormComposerList,
});
