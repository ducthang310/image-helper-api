/**
 * Get listing of the resource
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const list = async (req, res, next) => {
    const {filters, page, per_page, order} = req.body;
    try {
        // call userService to get listing of users
        // i.e. - await userService.list(filters, page, per_page, order)
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Get the specified resource in storage
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const load = async (req, res, next) => {
    try {
        // call userService to get detail of the user
        // i.e. - await userService.getUserDetail(userId)
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Store a newly created resource in storage
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const store = async (req, res, next) => {
    try {
        // call userService to store a new user
        // i.e. - await userService.createUser(userData)
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};


/**
 * Update the specified resource in storage
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const update = async (req, res, next) => {
    try {
        // call userService to update user
        // i.e. - await userService.updateUser(userData)
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

module.exports = {
    list, load, store, update
};
