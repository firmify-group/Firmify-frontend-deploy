import { COLORS } from "src/utils/constant/components";

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

    function getRandomColor(seed: string) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        const idx = Math.abs(hash) % COLORS.length;
        return COLORS[idx];
    }

    return {
        getBgClass,
        getBorderClass,
        getTextClass,
        getRandomColor
    };


}


