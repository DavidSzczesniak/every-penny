import { XIcon } from '@heroicons/react/solid';
import { Button, Modal, NumberInput, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/hooks';
import React from 'react';
import { customButtonStyles } from 'utils/customButtonStyles';

const AddExpenseModal = ({ opened, setOpened }) => {
    const form = useForm({
        initialValues: {
            title: '',
            amount: 0,
            date: new Date(),
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

    return (
        <Modal
            className="expense-modal"
            opened={opened}
            onClose={() => setOpened(false)}
            radius="lg"
            hideCloseButton>
            <div className="expense-modal__title">
                <h3>Add New Expense</h3>
                <button className="icon-button" onClick={() => setOpened(false)}>
                    <XIcon />
                </button>
            </div>
            <form
                className="expense-modal__body"
                onSubmit={form.onSubmit((values) => console.log(values))}>
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
                        placeholder="How much you paid"
                        step={0.05}
                        precision={2}
                        min={0}
                        required
                        {...form.getInputProps('amount')}
                    />
                    <DatePicker label="Date" {...form.getInputProps('date')} clearable={false} />
                </div>
                <Textarea
                    label="Note"
                    placeholder="Add a note (optional)"
                    {...form.getInputProps('note')}
                />
                <Button type="submit" radius="md" styles={customButtonStyles}>
                    Save
                </Button>
            </form>
        </Modal>
    );
};
export default AddExpenseModal;
