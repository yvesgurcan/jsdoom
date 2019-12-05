export default state => {
    const {
        game: { name, description, version, issues }
    } = state;
    console.info({ name });
    console.info({ description });
    console.info({ version });
    console.info(`Report an issue: ${issues}`);
};
