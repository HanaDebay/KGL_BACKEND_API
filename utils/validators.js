//alpha numeric validation
exports.isAlphaNumeric = (value, min = 1) => {
  return new RegExp(`^[a-zA-Z0-9]{${min},}$`).test(value);
};

//Alphabetic only
exports.isAlphabetic = (value, min = 2) => {
  return new RegExp(`^[a-zA-Z]{${min},}$`).test(value);
};

//required field
exports.isRequired = (value) => {
  return value !== undefined && value !== null && value !== "";
};

//numeric minimum check
exports.isNumericMin = (value, min = 1) => {
  return !isNaN(value) && Number(value) >= min;
};

//phone validation
exports.isValidPhone = (phone) => {
  // return /^(07|\+256)[0-9]{8,9}$/.test(phone);
  return /^((07[0-9]{8}) | (\+256[0-9]{9}))$/.test(phone);
};

//nin validation
exports.isValidNin = (nin) => {
  return /^[A-Z]{2}[0-9]{8}[A-Z]{1}$/.test(nin);
};

//branch validation
exports.isValidBranch = (branch) => {
  return ["Maganjo", "Matugga"].includes(branch);
};

exports.validateProcurement=(data)=>{
 if(!exports.isAlphaNumeric(data.produceName)) return "Invalid produce name";

 if(!exports.isAlphabetic(data.produceType,2)) return "Invalid produce type";

 if(!exports.isRequired(data.date)) return "Date required";

 if(!exports.isNumericMin(data.tonnage,100)) return "Tonnage must be >=100kg";

 if(!exports.isNumericMin(data.cost,10000) && !exports.isRequired(data.cost)) return "Cost too small and cost required";

 if(!exports.isAlphaNumeric(data.dealerName,2)) return "Invalid dealer name";

 if(!exports.isValidBranch(data.branch)) return "Invalid branch";

 if(!exports.isValidPhone(data.contact)) return "Invalid phone";

 return null;
};
