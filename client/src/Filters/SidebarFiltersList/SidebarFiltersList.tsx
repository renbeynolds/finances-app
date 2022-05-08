import { DatePicker, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { endDateState, startDateState } from '../FiltersState';

const { RangePicker } = DatePicker;

const { Text } = Typography;

const SidebarFiltersList = (): JSX.Element => {
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  const setStartDate = useSetRecoilState(startDateState);
  const setEndDate = useSetRecoilState(endDateState);
  return (
    <RangePicker
      value={[startDate, endDate]}
      allowClear={false}
      onChange={(dates) => {
        setStartDate(dates?.[0] as moment.Moment);
        setEndDate(dates?.[1] as moment.Moment);
      }}
    />
  );
};

export default SidebarFiltersList;
