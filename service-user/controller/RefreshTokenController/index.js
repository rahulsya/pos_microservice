const { RefreshToken, User } = require("../../models");

const CreateToken = async (req, res) => {
  try {
    const { user_id, refresh_token } = req.body;
    console.log(req.body);
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user no found",
      });
    }

    const createRefreshToken = await RefreshToken.create({
      user_id,
      token: refresh_token,
    });

    return res.json({
      status: "success",
      data: {
        id: createRefreshToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const GetToken = async (req, res) => {
  try {
    const refresh_token = req.query.refresh_token;
    const token = await RefreshToken.findOne({
      where: { token: refresh_token },
    });

    if (!token) {
      return res.status(404).json({
        status: "error",
        message: "user token not found",
      });
    }

    return res.json({
      status: "success",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = { CreateToken, GetToken };
