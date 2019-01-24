export default class UserModel {
    constructor (monking) {
        this.User = monking.model.user;
    }

    async add (name, age) {
        const user = new this.User({ name, age });
        return await user.save();
    }

    async get () {
        return await this.User.find().exec();
    }
};
