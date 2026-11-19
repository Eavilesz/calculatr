// Add new calculations here. Each one gets its own card on the home screen.
//   inputs:  fields the user fills in (values arrive as numbers, keyed by `key`)
//   compute: returns the result number
//   format:  how to display the result

const HOURS_PER_MONTH = 160;

const money = (n) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

export const calculations = [
  {
    id: 'monthly-salary',
    title: 'Monthly Salary',
    description: `Hourly rate × ${HOURS_PER_MONTH} hours`,
    inputs: [{ key: 'hourly', label: 'Hourly rate', prefix: '$' }],
    compute: ({ hourly }) => hourly * HOURS_PER_MONTH,
    resultLabel: 'Monthly salary',
    format: money,
  },
  {
    id: 'hourly-rate',
    title: 'Hourly Rate',
    description: `Monthly payment ÷ ${HOURS_PER_MONTH} hours`,
    inputs: [{ key: 'monthly', label: 'Monthly payment', prefix: '$' }],
    compute: ({ monthly }) => monthly / HOURS_PER_MONTH,
    resultLabel: 'Hourly rate',
    format: money,
  },
];
