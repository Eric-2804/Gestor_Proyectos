// generate-token.js
import jwt from 'jsonwebtoken';

const userId = '687eb9967410d096855eaf4f'; // Tu ID de usuario
const secret = 'secret123'; // Debe coincidir con tu JWT_SECRET del .env

const token = jwt.sign({ id: userId }, secret, { expiresIn: '1d' });

console.log('✅ Token generado:\n');
console.log(token);
