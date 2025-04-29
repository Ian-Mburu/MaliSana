// components/dashboard/DashboardSummary.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardSummary = ({ savings, spending, debt }) => (
  <Card>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h6">Total Savings</Typography>
          <Typography variant="h4">Ksh {savings || 0}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Monthly Spending</Typography>
          <Typography variant="h4">Ksh {spending || 0}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Total Debt</Typography>
          <Typography variant="h4">Ksh {debt || 0}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default DashboardSummary;