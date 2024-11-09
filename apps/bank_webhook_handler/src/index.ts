import express from 'express';
import db from "@repo/db/client";
const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    // will add some zod validation here
    const paymentInformation : {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Processing",
                }
            })
        ]),
        res.json({
            message: "Captured"
        })
    }catch(e){
        console.error(e);
        res.status(411).json({
            message: "error while processing web hook"
        })
    }
})

app.listen(3003);