module.exports = {
    isAuthenticated: (req) => {
        return !!req.session.user;
    },
    authenticateUser: (req, userData) => {
        req.session.user = userData;
    },
    logoutUser: (req) => {
        req.session.destroy();
    },
    getUser: (req) => {
        return req.session.user;
    }
};
