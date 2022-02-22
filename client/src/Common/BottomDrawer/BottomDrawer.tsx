import {
  CaretDownOutlined,
  CaretUpOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, Drawer, Typography } from 'antd';
import React, { useState } from 'react';
import { TransactionTable } from '../../Transactions/TransactionTable';
import { SIDE_MENU_WIDTH } from '../SideMenu';
import ResizeHandle from './ResizeHandle';

const CLOSED_HEIGHT = 55;
const OPEN_HEIGHT = 730;

const useStyles = makeStyles({
  drawer: {
    width: `calc(100% - ${SIDE_MENU_WIDTH}px)`,
    marginLeft: `${SIDE_MENU_WIDTH}px`,
    '& .ant-drawer-body': {
      padding: 0,
    },
    '& .ant-drawer-close': {
      marginRight: '48px',
    },
  },
});

const BottomDrawer = (): JSX.Element => {
  const classes = useStyles();
  const [height, setHeight] = useState<number>(CLOSED_HEIGHT);

  const onClose = () => {
    if (height === CLOSED_HEIGHT) {
      setHeight(OPEN_HEIGHT);
    } else {
      setHeight(CLOSED_HEIGHT);
    }
  };

  return (
    <Drawer
      title={
        <div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ResizeHandle
              onResize={setHeight}
              height={height}
              minHeight={CLOSED_HEIGHT}
              maxHeight={OPEN_HEIGHT}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '-16px',
            }}
          >
            <Typography
              style={{
                position: 'relative',
                top: '4px',
              }}
            >
              Transactions
            </Typography>
            <div style={{ display: 'flex' }}>
              <Button
                icon={
                  height === CLOSED_HEIGHT ? (
                    <CaretUpOutlined />
                  ) : (
                    <CaretDownOutlined />
                  )
                }
                style={{ border: 'none', marginRight: '8px' }}
                size='small'
                onClick={onClose}
              />
              <Button
                icon={<ExpandOutlined />}
                style={{ border: 'none' }}
                size='small'
              />
            </div>
          </div>
        </div>
      }
      placement='bottom'
      closable={false}
      visible
      mask={false}
      height={height}
      className={classes.drawer}
    >
      <TransactionTable />
    </Drawer>
  );
};

export default BottomDrawer;
