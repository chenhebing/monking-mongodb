export default {
    mongodb: {
        url: 'mongodb://localhost:27017/monking-mongodb',
        options: {
            useNewUrlParser: true,
            useFindAndModify: false
        },
        defaultSchema: {
            options: {
                id: true,
                toJSON: {
                    getters: true,
                    virtuals: true
                },
                toObject: {
                    getters: true,
                    virtuals: true
                },
                timestamps: {
                    createdAt: 'createTime',
                    updatedAt: 'updatedTime'
                }
            },
            schema: {

            }
        }
    }
};
