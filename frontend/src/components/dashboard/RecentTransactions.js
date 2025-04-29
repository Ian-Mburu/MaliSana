import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const RecentTransactions = ({ transactions }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions?.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
            <TableCell>{transaction.category?.name || 'Uncategorized'}</TableCell>
            <TableCell>Ksh {transaction.amount?.toFixed(2)}</TableCell>
          </TableRow>
        ))}
        {!transactions?.length && (
          <TableRow>
            <TableCell colSpan={3} align="center">No transactions found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

export default RecentTransactions;