import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SpendingChart = ({ data }) => {
  // Process data for chart
  const chartData = data?.reduce((acc, transaction) => {
    const category = transaction.category?.name || 'Other';
    const existing = acc.find(c => c.name === category);
    existing ? existing.value += transaction.amount : 
      acc.push({ name: category, value: transaction.amount });
    return acc;
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow h-96">
      <h3 className="text-lg font-semibold mb-4">Spending Breakdown</h3>
      {chartData?.length ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          No spending data
        </div>
      )}
    </div>
  );
};

export default SpendingChart;