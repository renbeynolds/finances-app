import accounting from 'accounting-js';
import { DatePicker, Space, Typography } from 'antd';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAccountOptions } from '../../../Hooks/useAccountOptions';
import { useCombinedAccountBalanceOverTime } from '../../../Hooks/useCombinedAccountBalanceOverTime';
import { useDateRange } from '../../../Hooks/useDateRange';
import DateRanges from '../../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last365Days();

function CombinedAccountBalanceOverTime() {

    const { dateStrings, setDates, bucket } = useDateRange(DEFAULT_RANGE);
    const data = useCombinedAccountBalanceOverTime(dateStrings, bucket);
    const accountOptions = useAccountOptions();

    return (
        <div>
            <Space direction='horizontal' style={{ marginLeft: '80px' }}>
                <Typography.Title level={5} style={{ lineHeight: '32px', marginBottom: 0 }}>Account Balances</Typography.Title>
                <RangePicker
                    defaultValue={DEFAULT_RANGE}
                    ranges={{
                        'Past Year': DEFAULT_RANGE,
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
                <XAxis dataKey='bucket'/>
                <YAxis tickFormatter={(value) => accounting.formatMoney(value, { precision: 0})}/>
                <CartesianGrid strokeDasharray='3 3'/>
                <Tooltip formatter={(value) => accounting.formatMoney(value)}/>
                { accountOptions.map(account => (
                    <Line key={account.id} connectNulls type='monotone' stroke={account.color} dataKey={account.name} />
                ))}
                <Line connectNulls type='monotone' stroke='#999999' dataKey='Total'/>
                <Legend />
            </LineChart>
        </div>
    );

}

export default CombinedAccountBalanceOverTime;