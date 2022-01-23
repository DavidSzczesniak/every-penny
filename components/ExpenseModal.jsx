import { XIcon } from '@heroicons/react/solid';
import { Button, Modal, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/hooks';
import { categories } from 'config/expensesConfig';
import dayjs from 'dayjs';
import React from 'react';
import { generalButtonStyles, primaryButtonStyles } from 'utils/customButtonStyles';

const ExpenseModal = ({ opened, setOpened, onSubmit, expenseData = null, onRemove = null }) => {
    if (expenseData) {
        expenseData.createdAt = dayjs(expenseData.createdAt).toDate();
    }
    const form = useForm({
        initialValues: expenseData || {
            title: '',
            amount: 0,
            createdAt: new Date(),
            category: '',
            note: '',
        },
        validationRules: {
            title: (value) => value.trim().length > 0,
            amount: (value) => value && /^\d{1,}(\.\d{0,2})?$/.test(value),
        },
        errorMessages: {
            title: 'Title is required',
            amount: 'Amount is required and should be a number',
        },
    });

    const resetModal = () => {
        form.reset();
        setOpened(false);
    };

    const handleSubmit = (values) => {
        onSubmit(values);
        resetModal();
    };

    const handleRemoveExpense = () => {
        onRemove();
        resetModal();
    };

    const modalTitle = expenseData ? 'Edit Expense' : 'Add New Expense';

    return (
        <Modal
            className="expense-modal"
            opened={opened}
            onClose={() => setOpened(false)}
            radius="lg"
            title={modalTitle}>
            <form
                className="expense-modal__body"
                onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Title"
                    placeholder="What the expense was"
                    required
                    data-autofocus
                    {...form.getInputProps('title')}
                />
                <div className="inline-fields">
                    <NumberInput
                        label="Amount"
                        step={0.05}
                        precision={2}
                        min={0}
                        required
                        {...form.getInputProps('amount')}
                    />
                    <DatePicker
                        label="Date"
                        {...form.getInputProps('createdAt')}
                        clearable={false}
                    />
                </div>
                <Select
                    label="Select category"
                    placeholder="Select category"
                    data={categories}
                    clearable
                    clearButtonLabel="Clear select field"
                    {...form.getInputProps('category')}
                />
                <Textarea
                    label="Note"
                    placeholder="Add a note (optional)"
                    {...form.getInputProps('note')}
                />
                <div className="modal-buttons">
                    {expenseData && (
                        <Button
                            variant="outline"
                            color="red"
                            styles={generalButtonStyles}
                            onClick={handleRemoveExpense}>
                            Remove
                        </Button>
                    )}
                    <Button type="submit" styles={primaryButtonStyles}>
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
export default ExpenseModal;
