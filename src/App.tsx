import { useFinanceData } from './hooks/useFinanceData';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthlyReport } from './components/MonthlyReport';
import { Home, PieChart, Settings, User, Plus } from 'lucide-react';
import { useState } from 'react';

function App() {
  const { transactions, addTransaction, deleteTransaction, income, expense, balance } = useFinanceData();
  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'add' | 'profile'>('home');

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', maxWidth: '428px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ padding: '32px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="avatar-circle">LQ</div>
          <div>
            <p style={{ fontSize: '12px', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Chào buổi sáng</p>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Lê Minh Quân</h2>
          </div>
        </div>
        <button style={{ padding: '8px', background: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Settings size={20} color="#9E9E9E" />
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 24px' }}>
        {activeTab === 'home' && (
          <>
            <Dashboard income={income} expense={expense} balance={balance} />
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 700 }}>Giao dịch gần đây</h3>
                <button style={{ border: 'none', background: 'none', color: '#00C853', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Xem tất cả</button>
              </div>
              <TransactionList transactions={transactions.slice(0, 5)} onDelete={deleteTransaction} />
            </div>
          </>
        )}

        {activeTab === 'add' && (
          <TransactionForm onAdd={(t) => { addTransaction(t); setActiveTab('home'); }} onClose={() => setActiveTab('home')} />
        )}

        {activeTab === 'report' && (
          <MonthlyReport transactions={transactions} />
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span>Trang chủ</span>
        </button>
        <button className={`nav-btn ${activeTab === 'report' ? 'active' : ''}`} onClick={() => setActiveTab('report')}>
          <PieChart size={24} strokeWidth={activeTab === 'report' ? 2.5 : 2} />
          <span>Báo cáo</span>
        </button>
        <button className="fab" onClick={() => setActiveTab('add')}>
          <Plus size={28} />
        </button>
        <button className="nav-btn" style={{ opacity: 0.5, pointerEvents: 'none' }}>
          <div style={{ width: '24px', height: '24px', border: '2px solid currentColor', borderRadius: '4px' }}></div>
          <span>Ví</span>
        </button>
        <button className="nav-btn" style={{ opacity: 0.5, pointerEvents: 'none' }}>
          <User size={24} />
          <span>Tôi</span>
        </button>
      </div>
    </div>
  );
}

export default App;

