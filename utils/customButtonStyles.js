import variables from 'styles/base/_settings.module.scss';

export const customButtonStyles = (theme) => ({
    root: {
        backgroundColor: variables.green,

        '&:hover': {
            backgroundColor: theme.fn.darken(variables.green, 0.05),
        },
    },
});
