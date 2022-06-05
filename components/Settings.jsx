import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import CategoryModal from './CategoryModal';

const Settings = () => {
    const dummyCats = [
        {
            name: 'Entertainment',
            color: '#337CF5',
        },
        {
            name: 'Electronics',
            color: '#F19838',
        },
        {
            name: 'Bills',
            color: '#7AC4F8',
        },
        {
            name: 'Food',
            color: '#A5D0A2',
        },
    ];

    const [currentCategory, setCurrentCategory] = useState(null);

    return (
        <>
            {!!currentCategory && (
                <CategoryModal
                    opened={!!currentCategory}
                    setOpened={setCurrentCategory}
                    onSubmit={() => console.log('SUBMITTING')}
                    data={currentCategory}
                />
            )}
            <div className="settings-box">
                <div className="settings-box__header">
                    <div className="settings-box__title">
                        <h3>Categories</h3>
                        <p>Edit your expense categories or add new ones.</p>
                    </div>
                    <Button
                        styles={primaryButtonStyles}
                        onClick={() => setCurrentCategory({ name: '', color: '' })}
                        size="xs">
                        Add New Category
                    </Button>
                </div>
                <ul className="categories-list">
                    {dummyCats.map((cat) => {
                        return (
                            <li key={cat.color} onClick={() => setCurrentCategory(cat)}>
                                <div>{cat.name}</div>
                                <div className="category-color">
                                    <div>{cat.color}</div>
                                    <div
                                        style={{ backgroundColor: cat.color }}
                                        className="category-color__circle"
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
export default Settings;
