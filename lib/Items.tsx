import { FormProps, Row, RowProps } from 'antd';
import React from 'react';

import { FormComposerItem, FormComposerItemProps } from './Item';

/**
 * Props for the FormComposerItems component.
 */
export type FormComposerItemsProps = {
  /** Array of form item configurations to render */
  items: FormComposerItemProps['itemConfig'][];
  /** Props for the Row component */
  rowProps?: RowProps;
  /** Name path for dynamic list */
  dynamicListName?: FormComposerItemProps['dynamicListName'];
  /** Configuration for dynamic list field */
  dynamicListConfig?: FormComposerItemProps['dynamicListConfig'];
  /** Root name path for nested forms */
  root?: FormComposerItemProps['root'];
  /** Layout type for the form items */
  layout?: FormProps['layout'];
};

/**
 * FormComposerItems renders a collection of FormComposerItem components.
 * Handles layout rendering, either inline or in a Row with columns.
 *
 * @param props - The props for the FormComposerItems component
 * @returns The rendered form items
 */
export const FormComposerItems: React.FC<FormComposerItemsProps> = React.memo(
  ({
    items,
    rowProps,
    dynamicListConfig,
    dynamicListName,
    root,
    layout = 'horizontal',
  }) => {
    const content = items.map((item, index) => (
      <FormComposerItem
        root={root}
        key={`${dynamicListConfig?.key || 'item'}-${index}`}
        dynamicListName={dynamicListName}
        dynamicListConfig={dynamicListConfig}
        itemConfig={item}
        layout={layout}
      />
    ));

    if (layout === 'inline') {
      return <>{content}</>;
    }

    return <Row {...(rowProps || { gutter: 16 })}>{content}</Row>;
  },
);
