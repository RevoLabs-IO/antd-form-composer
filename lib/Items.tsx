import { Row, RowProps } from 'antd';
import React from 'react';

import { FormComposerItem, FormComposerItemProps } from './Item';

export type FormComposerItemsProps = {
  items: FormComposerItemProps['itemConfig'][];
  rowProps?: RowProps;
  listName?: FormComposerItemProps['listName'];
  listConfig?: FormComposerItemProps['listConfig'];
};

export const FormComposerItems: React.FC<FormComposerItemsProps> = ({
  items,
  rowProps,
  listConfig,
  listName,
}) => {
  return (
    <Row {...(rowProps || { gutter: 16 })}>
      {items.map((item, index) => {
        return (
          <FormComposerItem
            key={`${listConfig?.key || 'item'}-${index}`}
            listName={listName}
            listConfig={listConfig}
            itemConfig={item}
          />
        );
      })}
    </Row>
  );
};
