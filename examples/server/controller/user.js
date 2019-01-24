import { Get, aopInject } from 'monking';

export default class User {
    @Get('/api/add/user')
    @aopInject('tryCatch')
    async addUser (user) {
        return await user.addUser();
    }

    @Get('/api/user')
    @aopInject('tryCatch')
    async getUser (user) {
        return await user.getUser();
    }
}
