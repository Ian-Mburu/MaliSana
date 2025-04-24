import { LinearProgress, Typography, Box } from '@mui/material';

const BudgetProgres = ({ budgets }) => {
  const calculateProgress = (budget) => {
    const spent = budget.transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
    return (spent / budget.amount) * 100;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Typography variant="h6" gutterBottom>
        Budget Progress
      </Typography>
      
      {budgets.map(budget => (
        <Box key={budget.id} className="mb-4">
          <Typography variant="body2">{budget.category}</Typography>
          <LinearProgress
            variant="determinate"
            value={calculateProgress(budget)}
            color={calculateProgress(budget) > 100 ? 'error' : 'primary'}
          />
          <Typography variant="caption">
            ${budget.spent || 0} of ${budget.amount}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default BudgetProgres;