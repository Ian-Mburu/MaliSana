import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Select, MenuItem, Button } from '@mui/material';

const validationSchema = Yup.object().shape({
  amount: Yup.number().required('Required').min(0.01),
  category: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
});

export const TransactionForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ amount: '', category: '', date: '', description: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form className="space-y-4">
        <Field name="amount">
          {({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              fullWidth
              error={touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
            />
          )}
        </Field>

        <Field name="category">
          {({ field }) => (
            <Select
              {...field}
              label="Category"
              fullWidth
              error={touched.category && !!errors.category}
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="transport">Transport</MenuItem>
              {/* Add more categories */}
            </Select>
          )}
        </Field>

        <Field name="date">
          {({ field }) => (
            <TextField
              {...field}
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Field>

        <Button type="submit" variant="contained" color="primary">
          Add Transaction
        </Button>
      </Form>
    )}
  </Formik>
);