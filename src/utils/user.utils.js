const nodemailer = require('nodemailer');

exports.sendEmail = async(options)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.zoho.com',
            port:"Zoho Mail",
            secure: true,
            auth: {
                user: 'roshinidevi.pv@thinkinfinity.co.in',
                pass: 'YLMeNtuqNcPF'
              }
        })
       
          
        await  transporter.sendMail(options,function(error,info){
            if (error) {
                console.log('error',error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          })

    
    } catch (error) {
        return { success: false, statusCode: 500, message: "Internal Server error" + error }
    }
}
