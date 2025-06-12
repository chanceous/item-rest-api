export const parseItemIdFromSlug = (slug: string): string => {
    if (!slug) return '';
    return slug.split('-')[0];
};

export const createSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
};