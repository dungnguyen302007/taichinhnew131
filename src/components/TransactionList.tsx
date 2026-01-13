import React from 'react';
import type { Transaction } from '../hooks/useFinanceData';
import { format } from 'date-fns';

interface Props {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount).replace('₫', 'đ');
};

const getIcon = (category: string) => {
    if (category.includes('Ăn')) return '🍽️';
    if (category.includes('Mua')) return '🛍️';
    if (category.includes('Di')) return '🚗';
    if (category.includes('Lương')) return '💰';
    if (category.includes('Cafe')) return '☕';
    return '📝';
};

export const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
    if (transactions.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9E9E9E', background: 'white', borderRadius: '24px' }}>
                <p>Chưa có giao dịch nào.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {transactions.map((t) => (
                <div key={t.id} style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            background: t.type === 'income' ? '#E8F5E9' : '#FFF3E0'
                        }}>
                            {getIcon(t.category)}
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{t.category}</h4>
                            <p style={{ fontSize: '12px', color: '#9E9E9E' }}>
                                {format(new Date(t.date), 'dd/MM/yyyy')}
                                {t.note && ` • ${t.note}`}
                            </p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 700, fontSize: '14px', color: t.type === 'income' ? '#00C853' : '#1A1D1E' }}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </p>
                        <button
                            onClick={() => onDelete(t.id)}
                            style={{ fontSize: '10px', color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
