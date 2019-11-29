'use strict';
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('booking', {
        bookingId: DataTypes.INTEGER,
        screeningName: DataTypes.STRING,
        meetingLocation: DataTypes.TEXT,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        startTime: DataTypes.DATE, // Translates to Datetime
        endTime: DataTypes.DATE
    }, {});
    Booking.associate = function (models) {
        // associations can be defined here
    };
    return Booking;
};
