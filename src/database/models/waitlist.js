"use strict";
module.exports = (sequelize, DataTypes) => {
    const waitlist = sequelize.define(
        "waitlist",
        {
            screeningName: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {}
    );
    waitlist.associate = function (models) {
        // associations can be defined here
    };
    return waitlist;
};
