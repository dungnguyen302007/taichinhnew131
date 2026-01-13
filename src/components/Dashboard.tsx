import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
    income: number;
    expense: number;
    balance: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(amount).replace('₫', 'đ');
};

export const Dashboard: React.FC<Props> = ({ income, expense, balance }) => {
    const [showBalance, setShowBalance] = useState(true);

    return (
        <div>
            {/* Balance Card */}
            <div className="balance-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#FBC02D', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px' }}>TỔNG SỐ DƯ KHẢ DỤNG</span>
                    <button onClick={() => setShowBalance(!showBalance)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                        {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <div className="balance-amount">
                    {showBalance ? formatCurrency(balance) : '••••••••'}
                </div>

                {showBalance && (
                    <div style={{ fontSize: '12px', color: '#4ade80', marginBottom: '16px' }}>
                        ↗ +2.4% so với tháng trước
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn-primary">+ Nạp tiền</button>
                    <button className="btn-secondary">💸 Chuyển</button>
                </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
                <div className="stat-card">
                    <div className="icon-circle icon-income">
                        <span style={{ fontSize: '20px' }}>↗</span>
                    </div>
                    <p style={{ fontSize: '10px', color: '#9E9E9E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Thu nhập</p>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#00C853', marginTop: '4px' }}>+{formatCurrency(income)}</p>
                </div>

                <div className="stat-card">
                    <div className="icon-circle icon-expense">
                        <span style={{ fontSize: '20px' }}>↙</span>
                    </div>
                    <p style={{ fontSize: '10px', color: '#9E9E9E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Chi tiêu</p>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#F44336', marginTop: '4px' }}>-{formatCurrency(expense)}</p>
                </div>
            </div>
        </div>
    );
};
