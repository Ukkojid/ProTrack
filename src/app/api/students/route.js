import { NextResponse } from "next/server";
import { connectDB } from "@/helper/db"

connectDB();


export function GET(request){
    console.log("what is this?");
    return NextResponse.json({
        message:"hey is this route"
    })

}
