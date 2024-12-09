import { Row, RowProps } from 'antd';
import React from 'react';

import { FormComposerItem, FormComposerItemProps } from './Item';

export type FormComposerItemsProps = {
  items: FormComposerItemProps['itemConfig'][];
  rowProps?: RowProps;
  parentFieldName?: FormComposerItemProps['parentFieldName'];
  listConfig?: FormComposerItemProps['listConfig'];
};

export const FormComposerItems: React.FC<FormComposerItemsProps> = ({
  items,
  rowProps,
  listConfig,
  parentFieldName,
}) => {
  return (
    <Row {...(rowProps || { gutter: 16 })}>
      {items.map((item, index) => {
        return (
          <FormComposerItem
            key={`${listConfig?.key || 'item'}-${index}`}
            parentFieldName={parentFieldName}
            listConfig={listConfig}
            itemConfig={item}
          />
        );
      })}
    </Row>
  );
};
