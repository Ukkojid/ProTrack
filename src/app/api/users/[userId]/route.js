import { User } from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    let { userId } = await params;

    try {
        const user = await User.findById({ _id: userId });
        console.log(user)
        return NextResponse.json(user, {
            success: true,
            message: "find user"
        })
    } catch (error) {
        return NextResponse.json({

            success: false,
            message: "error to find user"
        })
    }

}

export async function PUT(request, { params }) {
    let { userId } = params;
    const { name, password } = await request.json();

    try {

        const user = await User.findById(userId);

        user.name = name;
        user.password = password;

        const updateUser = await user.save();


        return NextResponse.json(updateUser)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "not updated"
        })
    }
}

export async function DELETE(request, { params }) {
    const { userId } = await params;

    try {
        await User.deleteOne({

            _id: userId,
        })

        return NextResponse.json({
            success: true,
            message: "user delete"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error to delete user"
        })
    }
}