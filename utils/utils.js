export function disableScrolling() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}

export function enableScrolling() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
}
