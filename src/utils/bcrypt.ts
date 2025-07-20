import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  enteredPassword: string,
  userPassword: string,
) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};
