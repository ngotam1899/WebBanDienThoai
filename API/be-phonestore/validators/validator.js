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

module.exports = {
    isValidObjId,
    isValidFile
}