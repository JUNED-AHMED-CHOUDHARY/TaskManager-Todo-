const User = require("../model/User");
const bcrypt = require("bcrypt");
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary");
const jwt = require("jsonwebtoken");

require("dotenv").config({path: "../config.config.env"});


exports.signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const { image } = req.files;
    if (!req.files && !req.files.image) {
      return res.status(400).json({
        success: false,
        message: `please add image ...`,
      });
    }

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: `please enter all details .all details are required`,
      });
    }

    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: `user already registered`,
      });
    }

    console.log("all clear till here ?");
    console.log(process.env.FOLDER_NAME);
    // upload image...
    const uploadResponse = await uploadImageToCloudinary(image, process.env.FOLDER_NAME); 
    console.log("cloudinary upload response -> ", uploadResponse);
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image: uploadResponse.secure_url, 
    });


    return res.status(200).json({
        success: true, 
        message: `user registered successfully`, 
        user: user, 
    });


  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `error while creating user = ${err.message}`,
    });
  }
};

exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false, 
                message: `please enter all details`, 
            })
        }

        let user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({
                success: false, 
                message: `email is not registered with us`, 
            })
        }


        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id, 
                email: email, 
            }                

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h", 
            });

            user.password = undefined;
            user.token = token;
            let updatedUser = {...user, token: token};
            user = updatedUser;
            console.log("user -> ", user);

            res.status(200).cookie("token", token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
                httpOnly: true, 
            }).json({
                success: true, 
                message: `user logged in successfully`, 
                user: user, 
            });

        } else {
            return res.status(400).json({
                success: false, 
                message: `password do not matched`, 
            })
        }

    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while login = ${err.message}`, 
        })
    }
}

exports.logout = async (req, res) => {
    try {

        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()), 
            httpOnly: true,
        }).json({
            success: true, 
            message: `user logged out successfully`, 
        }
        );


    } catch(err) {
        res.status(500).json({
            success: false, 
            message: `error while loging out = ${err.message}`, 
        });
    }
}

exports.myProfile = async (req, res) => {
  try {

    const user = req.user;
   
    const fullUser = await User.findById({_id: user.id});

    return res.status(200).json({
      success: true, 
      message: `User details fetched successBully Bully ???`, 
      fullUser, 
    });


  } catch(err) {

  }
}