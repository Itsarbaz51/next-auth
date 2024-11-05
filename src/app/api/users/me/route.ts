import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFormToken } from "../verifyemail/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    const userId = await getDataFormToken(request);
    const user = await User.findOne({_id: userId }).select("-password");
    if (!user) {
        return NextResponse.json({
            message: "User not found.",
            status: 404
        })
    }
    return NextResponse
    .json({
        message: "User found.",
        data: user
    })
}