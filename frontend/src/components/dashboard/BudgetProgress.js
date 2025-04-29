import { LinearProgress, Typography, Box } from '@mui/material';

const BudgetProgress = ({ budgets }) => {
  const calculateProgress = (budget) => {
    if (!budget.amount) return 0;
    return (budget.spent / budget.amount) * 100;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Typography variant="h6" gutterBottom>
        Budget Progress
      </Typography>
      
      {budgets?.map(budget => (
        <Box key={budget.id} className="mb-4">
          <Typography variant="body2">{budget.category}</Typography>
          <LinearProgress
            variant="determinate"
            value={calculateProgress(budget)}
            color={calculateProgress(budget) > 100 ? 'error' : 'primary'}
          />
          <Typography variant="caption">
            Ksh {budget.spent.toFixed(2)} of Ksh {budget.amount.toFixed(2)}
          </Typography>
        </Box>
      ))}
      
      {!budgets?.length && (
        <Typography variant="body2" color="textSecondary">
          No active budgets
        </Typography>
      )}
    </div>
  );
};

export default BudgetProgress;