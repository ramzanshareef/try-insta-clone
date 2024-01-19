const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const mailOptionsGenerator = (toMail) => {
    return {
        from: `OTP Validation <${process.env.EMAIL_USERNAME}>`,
        to: toMail,
        subject: "OTP Validation",
        html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        padding: 20px;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #555;
                        margin-bottom: 10px;
                        font-size: 16px;
                    }
                    strong {
                        color: #000;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    .otp {
                        font-size: 20px;
                        color: #ff6600;
                        margin-bottom: 20px;
                    }
                    .thank-you {
                        text-align: center;
                        font-size: 18px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>OTP for Login</h1>
                    <p>Your OTP for login is <strong class="otp">${otp}</strong></p>
                    <p>Please enter this OTP to proceed with the login.</p>
                    <p class="thank-you">Thank you!</p>
                </div>
            </body>
        </html>
    `,
    };
};

const sendMail = (toMail) => {
    const mailOptions = mailOptionsGenerator(toMail);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message);
            return false;
        } 
        else {
            console.log("Mail sent: " + info.response);
            return true;
        }
    });
};

module.exports = { 
    sendMail
}