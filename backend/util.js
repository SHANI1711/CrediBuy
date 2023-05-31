const jwt = require('jsonwebtoken');
const config = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const getToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || 'somethingssecret',
		{
			expiresIn: '98h',
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		const onlyToken = token.slice(7, token.length);
		jwt.verify(
			onlyToken,
			config.JWT_SECRET || 'somethingssecret',
			(err, decode) => {
				if (err) {
					return res.status(401).send({ message: 'Invalid Token' });
				}
				req.user = decode;
				next();
				return;
			}
		);
	} else {
		return res.status(401).send({ message: 'Token is not supplied.' });
	}
};

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return res.status(401).send({ message: 'Admin Token is not valid...' });
};

module.exports = { getToken, isAdmin, isAuth };
