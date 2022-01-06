import variables from 'styles/base/_settings.module.scss';

const general = {
    borderRadius: '8px',
};

export const generalButtonStyles = () => ({
    root: {
        ...general,
    },
});

export const primaryButtonStyles = (theme) => ({
    root: {
        ...general,
        backgroundColor: variables.green,

        '&:hover': {
            backgroundColor: theme.fn.darken(variables.green, 0.05),
        },
    },
});
