import accounting from 'accounting-js';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAccountBalanceOverTime } from '../../../Hooks/useAccountBalanceOverTime';

function AccountBalanceOverTime(props) {

    const data = useAccountBalanceOverTime(props.accountId);

    return (
        <div>
            <Typography.Title style={{ marginLeft: '80px' }} level={5}>Account Balance</Typography.Title>
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
                <Line type='monotone' dataKey='balance' stroke='#8884d8' activeDot={{ r: 8 }}/>
            </LineChart>
        </div>
    );
}

AccountBalanceOverTime.propTypes = {
    accountId: PropTypes.number.isRequired
};

export default AccountBalanceOverTime;