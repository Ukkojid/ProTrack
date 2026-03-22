import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

connectDB();


export async function GET(request) {
    
    let users = [];
    try {
        users = await User.find();
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: "failed to get users",
            success: false
        })
    }

    return NextResponse.json(users);
}

export async function POST(request) {

    const { name, email, password } = await request.json();

    const user = new User({
        name,
        email,
        password
    });

    try {
        const createUser = await user.save();
        const response = NextResponse.json(user, {
            status: 201,
            statusText: "user created"
        })
        return response
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: false,
            message: "failed to user created"
        })
    }

}

// export async function POST(request) {

//     const { name, email, password } = await request.json();

//     const usser = new User({
//         name,
//         email,
//         password
//     })
//     try {
//         await usser.save();

//         const response = NextResponse.json(usser, {
//             status: 201
//         })
//         return response;

//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             status: false,
//             message: "failed to create user !!"
//         })
//     }


// }