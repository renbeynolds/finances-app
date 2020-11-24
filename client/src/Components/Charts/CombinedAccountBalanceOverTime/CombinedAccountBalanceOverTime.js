import accounting from 'accounting-js';
import { DatePicker, Space, Typography } from 'antd';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAccountOptions } from '../../../Hooks/useAccountOptions';
import { useCombinedAccountBalanceOverTime } from '../../../Hooks/useCombinedAccountBalanceOverTime';
import { useDateRange } from '../../../Hooks/useDateRange';
import DateRanges from '../../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.yearToDate();

function CombinedAccountBalanceOverTime() {

    const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
    const data = useCombinedAccountBalanceOverTime(dateStrings);
    const accountOptions = useAccountOptions();

    return (
        <div>
            <Space direction='horizontal' style={{ marginLeft: '80px' }}>
                <Typography.Title level={5} style={{ lineHeight: '32px', marginBottom: 0 }}>Account Balances</Typography.Title>
                <RangePicker
                    defaultValue={DEFAULT_RANGE}
                    ranges={{
                        'Year to Date': DEFAULT_RANGE,
                        'This Month': DateRanges.thisMonth(),
                        'Last Month': DateRanges.lastMonth()
                    }}
                    onChange={(dates) => setDates(dates)}
                />
            </Space>
            <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey='month'/>
                <YAxis tickFormatter={(value) => accounting.formatMoney(value, { precision: 0})}/>
                <CartesianGrid strokeDasharray='3 3'/>
                <Tooltip formatter={(value) => accounting.formatMoney(value)}/>
                { accountOptions.map(account => (
                    <Line key={account.id} type='monotone' stroke={account.color} dataKey={account.name} />
                ))}
                <Line type='monotone' stroke='#999999' dataKey='Total'/>
                <Legend />
            </LineChart>
        </div>
    );

}

export default CombinedAccountBalanceOverTime;