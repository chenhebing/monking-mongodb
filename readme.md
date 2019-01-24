# monking-mongodb

依赖于 [monking](https://github.com/chenhebing/monking)，为其提供 model 层的能力。

### Installation

``` bash
$ # 强烈建议使用 yarn 安装依赖
$ yarn add monking-mongodb
```
monking >= 1.1.0

### Configuration Middleware

monking-mongodb 的 model 层的能力通过中间件来提供，其作为 monking 的一个扩展而存在，需要将其配置到 config 中，如下：

```javascript
// config/default.js

export default {
    middlewares: ['monking-mongodb/lib/middleware']
};
```

### Using

使用 [mongoose](http://mongoosejs.com/) 实现 server 端数据持久化功能。monking-mongodb 提供的中间件，会将 model 依赖注入，但是考虑到 mongoose 需要提前定义 schema 和 生成单例的 model，于是做了如下约定：index.js 根据schema 生成 model，生成的 model 会挂载在 monking.model 上面，model.js 来做增删改查的操作。

```js
// server/model/user/index.js

export default ({createSchema, createModel, Schema}) => {
    const schema = createSchema({
        name: String,
        age: String
    });

    return createModel('user', schema);
};
```
这里的 createSchema 和 createModel 只是对 new mongoose.Schema 和 mongoose.model 进行了封装，Schema 为 mongoose.Schema，用于创建 Schema 特有的数据类型。

```js
// server/model/user/model.js

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

```

monking、context 和logger 做了依赖注入，monking-mongodb 中间件将 userModel 做了依赖注入。

### Expose Config

monking-mongodb 提供了一些默认的 mongoose 的配置，用户可以自行覆盖默认配置，如下：

```javascript
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

```

monking-mongodb 作为 monking 的一个插件存在，配置文件需要配置到 config 中，以支持 monking 引入。

```javascript
// config/default.js

export default {
    pluginConfig: ['monking-mongodb/lib/config']
};
```

### License

MIT