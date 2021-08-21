exports.isAuthenticated = (context) => {
    const { user } = context;
    if (!user) {
        throw new Error('You are not authenticated.');
    }
}

exports.getStatus = (status, mess) => {
    return {
        success: status,
        message: mess
    }
}