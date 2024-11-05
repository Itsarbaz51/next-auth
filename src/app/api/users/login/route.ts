import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bycriptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse
           .json({error: "User not found"}, {status: 404});
        }
        console.log(user);

        const validPassword = await bycriptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse
           .json({error: "Invalid password"}, {status: 401});
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        
        const response = NextResponse.json({
            message: "Login successful", 
            success: true 
        });

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse
        .json({error: error.message},{status: 500})
    }
}