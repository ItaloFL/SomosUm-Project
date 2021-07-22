import bcrypt from 'bcryptjs'

export function createEncryptedCode() {
  var chars = '0123456789'.split('');
  var result = '';
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }

  const code = result;

  const encryptedCode = bcrypt.hashSync(code, 8)

  return { code, encryptedCode }
}