import dayjs from 'dayjs';

export const mockExpenses = [
    {
        id: '1',
        date: '04/12/2021',
        title: 'Rent',
        amount: 1095,
        category: 'Bills',
        note: 'same as always',
    },
    { date: '12/12/21', title: 'Food Shop', amount: 135.32, category: 'Food', note: '' },
    {
        id: '2',
        date: '02/05/2021',
        title: 'Headphones',
        amount: 69.99,
        category: 'Electronics',
        note: 'very cool',
    },
    {
        id: '3',
        date: '09/08/2020',
        title: 'Water bill',
        amount: 55.29,
        category: 'Bills',
        note: 'same as always',
    },
    {
        id: '4',
        date: '09/09/2015',
        title: 'Power bill',
        amount: 64.98,
        category: 'Bills',
        note: 'same as always',
    },
].map((expense) => ({ ...expense, date: dayjs(expense.date).toDate() }));
