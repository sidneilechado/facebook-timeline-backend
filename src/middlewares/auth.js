// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';

// import authConfig from '../config/auth';

// export default async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     req.userId = decoded.id;
//     return next();
//   } catch (err) {
//     return res.status(401).json(err);
//   }
// };

import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    res.status(401);
    res.send('Não autorizado: Sem token');
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Não autorizado: Token inválido');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
};
