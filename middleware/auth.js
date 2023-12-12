const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const userId = decodedToken.userId
        process.userId=userId;
        console.log(process.userId);
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        }   else{
            next();
        }
    } catch {
        res.status(403).json({error : error | 'Requête non authentifiée !'})
    }
};