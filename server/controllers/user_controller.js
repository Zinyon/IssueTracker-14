const { user: UserModel } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

const signup = async (req, res) => {
  try {
    const { email, nickname, password, passwordConfirm } = req.body;
    const checkPassword = password === passwordConfirm;
    const bcryptPassword = bcrypt.hashSync(password);
    const isExist = await UserModel.findOne({ where: { email } });

    if (isExist) {
      return res.status(409).json({ message: "fail" });
    }

    if (checkPassword) {
      try {
        await UserModel.create({
          email,
          nickname,
          password: bcryptPassword,
          provider: "local",
        });
        return res.status(201).json({ message: "success" });
      } catch (error) {
        return res.status(409).json({ message: "fail" });
      }
    }
    if (!checkPassword) {
      return res.status(400).json({ message: "fail" });
    }
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const localLogin = async (req, res) => {
  try {
    const { email, nickname, password: inputPassword } = req.body;
    const identifier = email ? { email } : { nickname };
    const currentUser = await UserModel.findOne({
      where: identifier,
    });

    if (!currentUser) {
      return res.status(403).json({ message: "fail" });
    }

    const compareResult = bcrypt.compareSync(
      inputPassword,
      currentUser.password
    );

    if (!compareResult) {
      return res.status(400).json({ message: "fail" });
    }

    if (compareResult) {
      const jwtoken = getToken({
        id: currentUser.id,
        email,
        nickname: currentUser.nickname,
      });
      // nickname return 우선 제외
      return res.status(200).json({
        message: "success",
        token: jwtoken,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const githubLogin = (req, res) => {
  try {
    const { email, nickname, id } = req.user;
    const jwtoken = getToken({ id, email, nickname });
    return res.status(200).json({ message: "success", token: jwtoken });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const appleLogin = async (req, res) => {
  try {
    const { name, hashcode } = req.body;
    const [appleUser] = await UserModel.findOrCreate({
      where: { nickname: name, password: hashcode },
      defaults: {
        email: `${name}@apple.com`,
        password: hashcode,
        nickname: name,
        provider: "apple",
      },
    });
    const jwtoken = getToken({
      id: appleUser.id,
      nickname: appleUser.nickname,
      email: appleUser.email,
    });
    return res.status(200).json({ message: "success", token: jwtoken });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const getToken = ({ id, nickname, email }) => {
  const payloadObj = {
    id,
    email,
    nickname,
  };
  return jwt.sign(payloadObj, process.env.JWT_SECRET_KEY);
};

module.exports = { signup, localLogin, githubLogin, appleLogin };
