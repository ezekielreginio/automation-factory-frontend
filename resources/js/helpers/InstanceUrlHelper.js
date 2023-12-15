export const parseInstanceUrl = (instance, platform) => {
    return window.instances[instance][platform]
}