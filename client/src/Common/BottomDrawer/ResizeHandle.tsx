import { EllipsisOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';

type ResizeHandleProps = {
  height: number;
  onResize: (height: number) => void;
  maxHeight: number;
} & typeof defaultProps;

const defaultProps = {
  minHeight: 0,
};

const ResizeHandle = ({
  height,
  onResize,
  minHeight,
  maxHeight,
}: ResizeHandleProps): JSX.Element => {
  const [previousClientY, setPreviousClientY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    ({ clientY }) => {
      if (dragging) {
        const newOffset = previousClientY - clientY;
        if (
          height + newOffset >= minHeight &&
          height + newOffset <= maxHeight
        ) {
          onResize(height + newOffset);
          setPreviousClientY(clientY);
        }
      }
    },
    [dragging, previousClientY, onResize, height, minHeight]
  );

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(false);
    }
  }, [dragging]);

  const handleMouseDown = useCallback((e) => {
    setPreviousClientY(e.clientY);
    setDragging(true);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <EllipsisOutlined
      onMouseDown={handleMouseDown}
      style={{
        cursor: 'row-resize',
        position: 'relative',
        bottom: '10px',
      }}
    />
  );
};

ResizeHandle.defaultProps = defaultProps;

export default ResizeHandle;
