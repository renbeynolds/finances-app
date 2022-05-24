import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import React from 'react';

const { Sider: AntdSider } = Layout;

const SIDER_WIDTH = 300;

const Sider = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <AntdSider collapsed={!open} width={SIDER_WIDTH}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 64,
        }}
      >
        <Button
          ghost
          icon={open ? <LeftOutlined /> : <RightOutlined />}
          style={{ border: 'none', marginRight: 24 }}
          onClick={open ? onClose : onOpen}
        />
      </div>
    </AntdSider>
  );
};

export default Sider;
