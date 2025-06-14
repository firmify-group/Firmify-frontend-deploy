export const useSelectiónColors = () => {

    const getBgClass = (color?: string) => {
        if (!color) return '';
        if (color.startsWith('#')) return '';
        return `bg-${color}`;
    };

    const getBorderClass = (color?: string) => {
        if (!color) return '';
        if (color.startsWith('#')) return '';
        return `border-${color}`;
    };

    const getTextClass = (color?: string) => {
        if (!color) return '';
        if (color.startsWith('#')) return '';
        return `text-${color}`;
    };

    return {
        getBgClass,
        getBorderClass,
        getTextClass,
    };


}