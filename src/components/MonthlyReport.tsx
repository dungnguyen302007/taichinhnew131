import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
} from 'recharts';
import type { Transaction } from '../hooks/useFinanceData';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, format } from 'date-fns';

interface Props {
    transactions: Transaction[];
}

export const MonthlyReport: React.FC<Props> = ({ transactions }) => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const currentMonthTransactions = transactions.filter((t) =>
        isWithinInterval(parseISO(t.date), { start: monthStart, end: monthEnd })
    );

    const barData = [
        { name: 'Thu Nhập', value: currentMonthTransactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0) },
        { name: 'Chi Tiêu', value: currentMonthTransactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0) },
    ];

    const expenseTransactions = currentMonthTransactions.filter((t) => t.type === 'expense');
    const categoryDataMap = expenseTransactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categoryDataMap).map(([name, value]) => ({ name, value }));

    // Green & Orange/Red Theme
    const COLORS = ['#00C853', '#FFAB00', '#FF5252', '#2979FF', '#AA00FF', '#00B0FF'];

    return (
        <div className="space-y-6 mb-20">
            <div className="bg-white p-6 rounded-[24px] shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-[#1A1D1E]">Tổng Quan Tháng {format(now, 'MM/yyyy')}</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#9AA0A6"
                                tick={{ fill: '#9AA0A6', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#9AA0A6"
                                tick={{ fill: '#9AA0A6', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => value > 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }}
                                itemStyle={{ color: '#1A1D1E', fontWeight: 600 }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                                {barData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#00C853' : '#FF5252'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-[#1A1D1E]">Phân Bổ Chi Tiêu</h3>
                <div className="h-64 w-full relative">
                    {pieData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                            <div className="w-16 h-16 rounded-full bg-gray-100"></div>
                            <p className="text-sm">Chưa có dữ liệu</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#FFFFFF',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }}
                                    itemStyle={{ color: '#1A1D1E' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};
