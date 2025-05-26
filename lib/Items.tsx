import { FormProps, Row, RowProps } from 'antd';
import React from 'react';

import { FormComposerItem, FormComposerItemProps } from './Item';

export type FormComposerItemsProps = {
  items: FormComposerItemProps['itemConfig'][];
  rowProps?: RowProps;
  dynamicListName?: FormComposerItemProps['dynamicListName'];
  dynamicListConfig?: FormComposerItemProps['dynamicListConfig'];
  root?: FormComposerItemProps['root'];
  layout?: FormProps['layout'];
};

export const FormComposerItems: React.FC<FormComposerItemsProps> = ({
  items,
  rowProps,
  dynamicListConfig,
  dynamicListName,
  root,
  layout = 'horizontal',
}) => {
  const content = items.map((item, index) => {
    return (
      <FormComposerItem
        root={root}
        key={`${dynamicListConfig?.key || 'item'}-${index}`}
        dynamicListName={dynamicListName}
        dynamicListConfig={dynamicListConfig}
        itemConfig={item}
        layout={layout}
      />
    );
  });

  if (layout === 'inline') {
    return content;
  }

  return <Row {...(rowProps || { gutter: 16 })}>{content}</Row>;
};
