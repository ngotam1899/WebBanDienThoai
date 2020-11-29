isValidObjId = (ID) => {
    const pattern = /^[a-fA-F0-9]{24}$/
    return pattern.test(ID);
}

module.exports = {
    isValidObjId
}