import { isValidObjectId } from 'mongoose';

// Define a function that takes in a variable number of ObjectIDs as arguments
function validateObjectID(...ObjectIDs) {
    return function (req, res, next) {
        // Loop through each provided ObjectID and check if it's valid in the request params
        ObjectIDs.forEach((id) => {
            if (!isValidObjectId(req.params[id])) { 
                res.status(400); 
                throw new Error("Invalid id."); 
            } else {
                next(); // Call the next middleware if the ID is valid
            }
        });
    }
}

module.exports = validateObjectID;
