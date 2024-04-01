const requireAuth = (req, _res, next) => {
    // doesn't check for empty string right now
    if (!req.session!.user) {
        next(new Error('Unauthorized'));
    } else {
        next();
    }
}

export default requireAuth;