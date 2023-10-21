export const filterNullValues = (object) => {
    return Object.keys(object)
        .filter((key) => object[key] != null)
        .reduce((filter, key) => ({ ...filter, [key]: object[key] }), {});
}