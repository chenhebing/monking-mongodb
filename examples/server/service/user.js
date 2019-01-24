export default (query, userModel) => {
    const addUser = async () => {
        const { name, age } = query;
        return await userModel.add(name, age);
    };

    const getUser = async () => {
        return await userModel.get();
    };

    return {
        addUser,
        getUser
    };
};
