export function disableScrolling() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}

export function enableScrolling() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
