/**
 * Utils functions for the whole project.
 */

function capitalizeWord(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function capitalize(string) {
    return string
        .split(' ')
        .map(s => capitalizeWord(s))
        .join(' ');
}
