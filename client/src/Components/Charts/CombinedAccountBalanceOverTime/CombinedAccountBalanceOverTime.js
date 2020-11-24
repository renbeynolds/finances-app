import accounting from 'accounting-js';
import { Typography } from 'antd';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAccountOptions } from '../../../Hooks/useAccountOptions';
import { useCombinedAccountBalanceOverTime } from '../../../Hooks/useCombinedAccountBalanceOverTime';

function CombinedAccountBalanceOverTime() {

    const data = useCombinedAccountBalanceOverTime();
    const accountOptions = useAccountOptions();

    return (
        <div>
            <Typography.Title style={{ marginLeft: '80px' }} level={5}>Account Balances</Typography.Title>
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