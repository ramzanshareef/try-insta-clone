const generateOTP = () => {
    const otpLength = 6;
    const otpDigits = "0123456789";
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += otpDigits[Math.floor(Math.random() * otpDigits.length)];
    }
    return otp;
}

const OTP = generateOTP();

const validateOTP = (otp) => {
    if (otp === OTP) {
        return true;
    }
    return false;
}

module.exports = {
    OTP,
    validateOTP
}