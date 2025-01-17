import { Group, Select, SelectProps } from '@mantine/core';
import {
  IconBuildingBank,
  IconCategory,
  IconCheck,
  IconUpload,
} from '@tabler/icons-react';
import * as React from 'react';

const data = [
  { value: 'accounts', label: 'Accounts' },
  { value: 'categories', label: 'Categories' },
  { value: 'uploads', label: 'Uploads' },
];

const iconProps = {
  stroke: 1.5,
  color: 'currentColor',
  opacity: 0.6,
  size: 18,
};

const icons: Record<string, React.ReactNode> = {
  accounts: <IconBuildingBank {...iconProps} />,
  categories: <IconCategory {...iconProps} />,
  uploads: <IconUpload {...iconProps} />,
};

const renderSelectOption: SelectProps['renderOption'] = ({
  option,
  checked,
}) => (
  <Group flex='1' gap='xs'>
    {icons[option.value]}
    {option.label}
    {checked && (
      <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />
    )}
  </Group>
);

interface SideMenuContentSelectorProps {
  selectedContent: string;
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideMenuContentSelector({
  selectedContent,
  setSelectedContent,
}: SideMenuContentSelectorProps) {
  const onChange = (val: string | null) => {
    setSelectedContent(val!);
  };

  return (
    <Select
      size='md'
      data={data}
      leftSection={icons[selectedContent]}
      value={selectedContent}
      onChange={onChange}
      renderOption={renderSelectOption}
    />
  );
}
