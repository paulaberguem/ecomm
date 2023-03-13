import bcrypt from 'bcryptjs';

class Hash {
  static encrypt = async (senha) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(senha, salt);
  };
}

export default Hash;
