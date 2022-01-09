import dayjs from 'dayjs';

export const mockExpenses = [
    {
        id: '1',
        createdAt: '04/12/2021',
        title: 'Rent',
        amount: 1095,
        category: 'Bills',
        note: 'same as always',
    },
    {
        id: '2',
        createdAt: '12/12/21',
        title: 'Food Shop',
        amount: 135.32,
        category: 'Food',
        note: '',
    },
    {
        id: '3',
        createdAt: '02/05/2021',
        title: 'Headphones',
        amount: 69.99,
        category: 'Electronics',
        note: 'very cool',
    },
    {
        id: '4',
        createdAt: '09/08/2020',
        title: 'Water bill',
        amount: 55.29,
        category: 'Bills',
        note: 'same as always',
    },
    {
        id: '5',
        createdAt: '09/09/2015',
        title: 'Power bill',
        amount: 64.98,
        category: 'Bills',
        note: 'same as always',
    },
].map((expense) => ({ ...expense, createdAt: dayjs(expense.createdAt).toDate() }));
