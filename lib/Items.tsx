import { Row, RowProps } from 'antd';
import React from 'react';

import { FormComposerItem, FormComposerItemProps } from './Item';

export type FormComposerItemsProps = {
  items: FormComposerItemProps['itemConfig'][];
  rowProps?: RowProps;
  dynamicListName?: FormComposerItemProps['dynamicListName'];
  dynamicListConfig?: FormComposerItemProps['dynamicListConfig'];
  root?: FormComposerItemProps['root'];
};

export const FormComposerItems: React.FC<FormComposerItemsProps> = ({
  items,
  rowProps,
  dynamicListConfig,
  dynamicListName,
  root,
}) => {
  return (
    <Row {...(rowProps || { gutter: 16 })}>
      {items.map((item, index) => {
        return (
          <FormComposerItem
            root={root}
            key={`${dynamicListConfig?.key || 'item'}-${index}`}
            dynamicListName={dynamicListName}
            dynamicListConfig={dynamicListConfig}
            itemConfig={item}
          />
        );
      })}
    </Row>
  );
};
