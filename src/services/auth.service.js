const registerModel = require('../models/auth/register.model')
const tokenModel = require('../models/auth/token.model')
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;
const {sendEmail} = require('../utils/user.utils')

exports.createRegister = async (req, res) => {

    let registerData = req.body;
    const { password, confirmPassword, role } = req.body;

    try {
        
        if (password !== confirmPassword) {
            return { success: false, statusCode: 400, message: "Password and confirm Password do not match" };

        }

        const existingUser = await registerModel.findOne({ email: registerData.email });
        if (existingUser) {
            return { success: false, statusCode: 400, message: "Email already exists" };

        }

        registerData.role = role || 'User';
        const newRegister = new registerModel(registerData);
        await newRegister.save();

        return { success: true,statusCode: 200, message: "User created successfully" };

    } catch (err) {
        console.error('Error creating user:', err);
         return { success: false, statusCode: 500, message: "error occured" + err }
    }
};


exports.login = async (req, res) => {
    let data = req.body;
    const { email, password } = data;
    try {
        if (!email || !password) {
            return { success: false, statusCode: 400, message: 'emailId or Password is required' }
        }

        const loginUser = await registerModel.find({ email: email })
        if (!loginUser || loginUser.length == 0 ) {
            return { success: false, statusCode: 400, message: "invalid details" }
        } else {
            if (loginUser.password === password) {
                return { success: false, statusCode: 500, message: "password not matched" }
            } else {
                const payload = {
                    _id: loginUser[0]._id,
                    role: loginUser[0].role
                }

                const accessToken = jwt.sign(payload, secretKey, { expiresIn: accessTokenExpiryTime })
                const refreshToken = jwt.sign(payload, secretKey, { expiresIn: refreshTokenExpiryTime })

                const loginId = loginUser._id;

                const data = { accessToken: accessToken, refreshToken: refreshToken, userId: loginId,role: loginUser.role }
                return { data: data, success: true, statusCode: 200, message: "User login successfully" }
            }
        }
    }
    catch (err) {
        console.log('err', err);
        return { success: false, statusCode: 500, message: "error occured" + err }
    }

}

exports.refreshToken = async (req) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return { success: false, statusCode: 401, message: 'Refresh token is required' };
    }

    try {
        const user = await verifyToken(refreshToken, secretKey);
        const loginUser = await registerModel.find({ _id: user._id });
        if (!loginUser) {
            return { success: false, statusCode: 404, message: 'User not found' };
        }

        const newAccessToken = jwt.sign({ _id: user._id }, secretKey, { expiresIn: accessTokenExpiryTime });
        const newRefreshToken = jwt.sign({ _id: user._id }, secretKey, { expiresIn: refreshTokenExpiryTime });

        return {
            success: true, statusCode: 200,
            message: 'Tokens refreshed successfully',
            data: { accessToken: newAccessToken, refreshToken: newRefreshToken }
        };

    } catch (err) {
        return { success: false, statusCode: 403, message: 'Invalid refresh token' };
    }
}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};


exports.forgotPassword = async (req, res) => {
    const {email }= req.body;
    try {
        if(email){
            const findUser = await registerModel.find({email:email})
            if(findUser){
                const mailOptions = {
                    from: 'roshinidevi.pv@thinkinfinity.co.in',
                    to: 'yogaraj.a@thinkinfinity.co.in',
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!'
                  };
                await sendEmail(mailOptions)
                return { success: false, statusCode: 200, message: "email sent to u" }

            }else{
                return { success: false, statusCode: 400, message: "did not find user" }

            }
        }else{
            return { success: false, statusCode: 400, message: "invalid email" }
        }


    } catch (error) {
 return { success: false, statusCode: 500, message: "error occured" + error }
    }
}


