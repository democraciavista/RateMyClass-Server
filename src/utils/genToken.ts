import { hash } from 'bcryptjs';

async function genToken() {
  const token = Math.floor(Math.random() * 999999).toString();
  const hashedToken = await hash(token, 6);
  return { token, hashedToken };
}

export { genToken };