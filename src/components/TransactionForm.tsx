import React, { useState } from 'react';
import { X, Calendar, Edit3 } from 'lucide-react';
import type { TransactionType } from '../hooks/useFinanceData';

interface Props {
    onAdd: (transaction: {
        type: TransactionType;
        amount: number;
        category: string;
        note: string;
        date: string;
    }) => void;
    onClose?: () => void;
}

const categories = {
    expense: [
        { id: 'an-uong', name: 'Ăn uống', icon: '🍽️' },
        { id: 'mua-sam', name: 'Mua sắm', icon: '🛍️' },
        { id: 'di-chuyen', name: 'Di chuyển', icon: '🚗' },
        { id: 'cafe', name: 'Cafe', icon: '☕' },
        { id: 'nha-cua', name: 'Nhà cửa', icon: '🏠' },
        { id: 'hoa-don', name: 'Hóa đơn', icon: '📄' },
    ],
    income: [
        { id: 'luong', name: 'Lương', icon: '💰' },
        { id: 'thuong', name: 'Thưởng', icon: '🎁' },
        { id: 'khac', name: 'Khác', icon: '💎' },
    ],
};

export const TransactionForm: React.FC<Props> = ({ onAdd, onClose }) => {
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories.expense[0]);
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || isNaN(Number(amount))) return;
        onAdd({ type, amount: Number(amount), category: category.name, note, date });
    };

    const currentCategories = type === 'income' ? categories.income : categories.expense;

    return (
        <div className="card-modern" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="form-header">
                <button onClick={onClose} className="form-close-absolute md:hidden">
                    <X size={20} />
                </button>
                <span className="form-title">Thêm giao dịch</span>
            </div>

            {/* Segmented Control */}
            <div className="segmented-control">
                <button
                    onClick={() => { setType('expense'); setCategory(categories.expense[0]); }}
                    className={`segment-btn ${type === 'expense' ? 'active' : ''}`}
                >
                    Chi tiêu
                </button>
                <button
                    onClick={() => { setType('income'); setCategory(categories.income[0]); }}
                    className={`segment-btn ${type === 'income' ? 'active' : ''}`}
                >
                    Thu nhập
                </button>
            </div>

            {/* Amount Input */}
            <div className="big-amount-input">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        autoFocus
                    />
                    <span style={{
                        position: 'absolute',
                        right: '-24px',
                        top: '8px',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#00C853'
                    }}>đ</span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#9E9E9E', fontWeight: 500 }}>Nhập số tiền</p>
            </div>

            {/* Categories */}
            <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Hạng mục</p>
            <div className="category-grid">
                {currentCategories.map((c) => (
                    <div
                        key={c.id}
                        className={`category-box ${category.id === c.id ? 'active' : ''}`}
                        onClick={() => setCategory(c)}
                    >
                        <span className="icon">{c.icon}</span>
                        <span className="name">{c.name}</span>
                    </div>
                ))}
            </div>

            {/* Meta Inputs */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#9E9E9E', marginBottom: '8px', display: 'block' }}>Ngày</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F7F9FC', padding: '12px', borderRadius: '14px' }}>
                            <Calendar size={18} color="#9E9E9E" style={{ marginRight: '8px' }} />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 600, color: '#1A1D1E', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1.5 }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#9E9E9E', marginBottom: '8px', display: 'block' }}>Ghi chú</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F7F9FC', padding: '12px', borderRadius: '14px' }}>
                            <Edit3 size={18} color="#9E9E9E" style={{ marginRight: '8px' }} />
                            <input
                                type="text"
                                placeholder="Ghi chú..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 600, color: '#1A1D1E', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn-action">
                    Lưu giao dịch
                </button>
            </div>
        </div>
    );
};

