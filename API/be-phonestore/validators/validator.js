isValidObjId = (ID) => {
    const pattern = /^[a-fA-F0-9]{24}$/
    return pattern.test(ID);
}

isValidFile = (file) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
        return false;
    }
    return true;
}

isAdmin = (user) => {
    if (user.role == '0') return true;
    return false;
}

module.exports = {
    isValidObjId,
    isValidFile,
    isAdmin
}