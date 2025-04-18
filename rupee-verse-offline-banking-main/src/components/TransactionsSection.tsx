import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Transaction = {
  id: number;
  type: 'sent' | 'received' | 'payment';
  name: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  icon: React.ElementType;
};

const transactions = [
  {
    id: 1,
    type: 'sent' as const,
    name: 'Sent to Rahul',
    amount: '₹500',
    date: '2024-04-14',
    status: 'completed' as const,
    icon: ArrowUpRight,
  },
  {
    id: 2,
    type: 'received' as const,
    name: 'Received from Priya',
    amount: '₹1,200',
    date: '2024-04-13',
    status: 'completed' as const,
    icon: ArrowDownLeft,
  },
  {
    id: 3,
    type: 'payment' as const,
    name: 'Grocery Store',
    amount: '₹750',
    date: '2024-04-12',
    status: 'pending' as const,
    icon: ShoppingBag,
  },
  {
    id: 4,
    type: 'payment' as const,
    name: 'Coffee Shop',
    amount: '₹180',
    date: '2024-04-11',
    status: 'completed' as const,
    icon: Coffee,
  },
];

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isPositive = transaction.type === 'received';
  
  const getStatusBadge = () => {
    switch(transaction.status) {
      case 'completed':
        return <span className="badge badge-green">Completed</span>;
      case 'pending':
        return <span className="badge bg-yellow-500/20 text-yellow-500">Pending</span>;
      case 'failed':
        return <span className="badge bg-red-500/20 text-red-500">Failed</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isPositive ? 'bg-emerald/20 text-emerald' : 'bg-rupee/20 text-rupee'
        }`}>
          <transaction.icon className="w-5 h-5" />
        </div>
        
        <div>
          <p className="font-medium">{transaction.name}</p>
          <p className="text-sm text-muted-foreground">{transaction.date}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <p className={`font-medium ${isPositive ? 'text-emerald' : ''}`}>
          {isPositive ? '+' : '-'}{transaction.amount}
        </p>
        {getStatusBadge()}
      </div>
    </div>
  );
};

const TransactionsSection = () => {
  return (
    <section id="transactions-section" className="py-16 md:py-24 bg-secondary/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Track Every Transaction, <span className="text-primary">Even Offline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your transactions are securely stored, even without internet connectivity, and synced when you're back online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-gradient rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-poppins font-medium text-lg">Recent Transactions</h3>
              <div className="badge badge-purple flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Offline Available
              </div>
            </div>
            
            <div className="max-h-96 overflow-auto">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10 text-center">
              <Button variant="link" className="text-primary">View All Transactions</Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="card-gradient rounded-2xl p-6">
              <h3 className="font-poppins font-medium text-lg mb-4">Transaction Stats</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-sm text-muted-foreground mb-2">This Month</h4>
                  <p className="font-poppins font-medium text-2xl">₹24,500</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-sm text-muted-foreground mb-2">Last Month</h4>
                  <p className="font-poppins font-medium text-2xl">₹18,750</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-sm text-muted-foreground mb-4">Spending Categories</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Food & Groceries</span>
                      <span>₹5,200</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full purple-gradient rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transportation</span>
                      <span>₹3,800</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full purple-gradient rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilities</span>
                      <span>₹2,500</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full purple-gradient rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-gradient rounded-2xl p-6 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full green-gradient flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-poppins font-medium text-lg">Need to send money offline?</h3>
                <p className="text-muted-foreground">Use our peer-to-peer feature to transfer funds locally.</p>
              </div>
              
              <Button className="green-gradient">Try Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;
