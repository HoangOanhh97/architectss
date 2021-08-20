const jwt = require('jsonwebtoken');

exports.isAuthenticated = (token) => {
    if (!token) {
        return null
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded || null;
}

exports.getStatus = (status, mess) => {
    return {
        success: status,
        message: mess
    }
}