'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        username: DataTypes.STRING
    });

    return user;
};
