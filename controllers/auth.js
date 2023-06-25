const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
 
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password,salt)
  // const tempUser = {name,email,password:hashedPassword} //ES6 dynamic operation of same property and value for bot name and email
  if (!name || !email || !password) {
    throw new BadRequestError("please provide name,email,password");
  }
  const user = await User.create({ ...req.body });
  // const token = jwt.sign({userId:user._id,username:user.name},"jwtsecret",{
  //   expiresIn:"30d"
  // })
  const token = user.createToken();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError("please provide a valid password")
  }
 
  const token = user.createToken()
  res.status(StatusCodes.OK).json({username:{name:user.name},token})
};

module.exports = {
  register,
  login,
};
