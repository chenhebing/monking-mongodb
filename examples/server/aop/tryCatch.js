export default (response, logger, context) => {
    return async (target) => {
        try {
            const data = await context.$injector.invoke(target);
            response(data);
        } catch (err) {
            logger.error(err);
            response(null, err.code || 500, err.msg || '');
        }
    };
};
