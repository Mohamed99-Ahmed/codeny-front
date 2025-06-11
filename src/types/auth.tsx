type submitType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  location: string;
};
type loginType = {
  email: string;
  password: string;
};
type forgetPasswordType = {
  email: string;
};
type resetPasswordType = {
  token: string;
  password: string;
  rePassword: string;
};
type payload = {
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
};
type userType = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  country: string;
  role: string;
  passwordChangedAt: string;
};
export type {
  submitType,
  loginType,
  forgetPasswordType,
  resetPasswordType,
  payload,
  userType,
};
