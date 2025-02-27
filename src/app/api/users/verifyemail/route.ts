import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect()
console.log("dskjk");


export async function POST(request: NextRequest ) {
    try {
        
        const reqBody = await request.json();
        console.log("im ready to verify", reqBody);
        const {token} = reqBody
        console.log("token", token);
        console.log("reqBody", reqBody);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: { $gt: Date.now() }});

        if (!user) {
            return NextResponse
        .json(
            {
                message: "Invalid token"
            },
            {
                status: 400
            }
        )
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();

        return NextResponse
        .json({message: "Email verified successfully", success: true}, {status: 200})
    } catch (error: any) {
        return NextResponse
        .json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}