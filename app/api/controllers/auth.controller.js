/**
 * Get a JWT via given credentials
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        // check credentials, get jwt token
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Send a reset link to the given user
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const getResetToken = async (req, res, next) => {
    try {
        const {token, email, password, confirmation_password} = req.body;
        // ...
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Reset password
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const resetPassword = async (req, res, next) => {
    try {
        const {token, email, password, confirmation_password} = req.body;
        // ...
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Get the authenticated User
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const me = async (req, res, next) => {
    try {
        // ...
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Log the user out (Invalidate the token)
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const logout = async (req, res, next) => {
    try {
        // ...
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

module.exports = {
    login, logout, me, resetPassword, getResetToken
};
