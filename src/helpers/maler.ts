import nodeMailer from 'nodemailer';
import {User} from "@/models/user.model";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
console.log("hashedToken", hashedToken);
console.log(emailType, email, userId);


        if (emailType === "VERIFY") {
            const verifiedToken = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: new Date(Date.now() + 3600000) 
                }
            })
            console.log("verifiedToken", verifiedToken);
            
        }else if (emailType === "RESET "){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                forgorPasswordTokenExpiry: new Date(Date.now() + 3600000)                }
            })
        }
        const transport = nodeMailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c4657c73e0f8ff", 
              pass: "84eaaae2a41ebf"
            }
          });

        const mailOptions = {
            from: 'arbaz@arbaz.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password.",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify email?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email." : "reset your password."} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verify email?token=${hashedToken}
            </p>`,
        }

        const mailResponse  = await transport.sendMail(mailOptions)
        console.log("mailResponse", mailResponse);
        
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}