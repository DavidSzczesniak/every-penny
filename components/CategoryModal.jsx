import { Button, ColorInput, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { categorySwatches } from 'config/swatches';
import React, { useState } from 'react';
import { primaryButtonStyles, generalButtonStyles } from 'utils/customButtonStyles';

const CategoryModal = ({ opened, setOpened, onSubmit, data = null, onRemove = null }) => {
    const form = useForm({
        initialValues: data || {
            name: '',
            color: '',
        },
        validationRules: {
            name: (value) => value.trim().length > 0,
            color: (value) => value.trim().length > 0,
        },
        errorMessages: {
            name: 'Name is required',
            color: 'Color is required',
        },
    });

    const [editMode, setEditMode] = useState(!!form.values.name);

    const resetModal = () => {
        form.reset();
        setOpened(false);
    };

    const handleSubmit = (values) => {
        if (editMode) {
            // todo: update category request
        } else {
            // todo: create category request
        }

        onSubmit(values);
        resetModal();
    };

    const handleRemove = () => {
        // todo: remove category request
        resetModal();
    };

    return (
        <Modal
            className="expense-modal"
            opened={opened}
            onClose={() => setOpened(false)}
            radius="lg"
            title={`${editMode ? 'Edit' : 'Add'} Category`}>
            <form
                className="expense-modal__body"
                onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Name"
                    placeholder="Name for category"
                    required
                    data-autofocus
                    {...form.getInputProps('name')}
                />
                <div className="inline-fields">
                    <ColorInput
                        label="Color"
                        placeholder="Color for category"
                        required
                        disallowInput
                        withPicker={false}
                        swatches={categorySwatches}
                        {...form.getInputProps('color')}
                    />
                </div>
                <div className="modal-buttons">
                    {editMode && (
                        <Button
                            variant="outline"
                            color="red"
                            styles={generalButtonStyles}
                            onClick={handleRemove}>
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
export default CategoryModal;
