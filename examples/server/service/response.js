const codeMap = {
    200: '',
    400: '请求参数错误',
    401: '身份认证失败',
    403: '拒绝执行',
    404: '访问接口或请求数据不存在',
    405: '请求方法不能用于请求该资源',
    500: '服务器内部错误，请稍后重试',
    502: '网关错误，请稍后重试'
};

export default (context) => {
    return (data = {}, code = 200, msg = '') => {
        msg = msg || codeMap[code];
        context.body = {
            data, code, msg
        };
    };
};
