export default ({createSchema, createModel, Schema}) => {
    const schema = createSchema({
        name: String,
        age: String
    });

    return createModel('user', schema);
};
