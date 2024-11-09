"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function onCreateRamptransaction(provider: string, amount: number){

    // never share the id as a prop because somone can share alternate id as a prop and make a false call , therefore always try to extract it from the session
    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id)
        return {
            message: "Unauthenicated request"    
        }

    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            token: token,
            status: "Success",
            amount: amount,
            startTime: new Date(),
            userId: Number(session?.user?.id)
        } 
    });

    return {
        message: "Done"
    }
}


