import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import prisma from "@repo/db/client";

async function getP2PTransactions(){
    const session = await getServerSession(authOptions);
    const userTransactions = await prisma.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        select: {
            sentTansfers: {
                select: {
                    amount: true,
                    timestamp: true,
                    toUser: {
                        select: {
                            name: true,
                        }
                    }
                }
            },
            receivedTransfers: {
                select: {
                    amount: true,
                    timestamp: true,
                    fromUser: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        }
    });

    if(!userTransactions)
    {
        return null;
    }

return userTransactions;
}

export default async function(){

    const userTransactions = await getP2PTransactions();

    return <div 
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "center"
        }}  
    >
        <div>
            <h2>Sent</h2>
            {userTransactions?.sentTansfers?.map((t) => (
                <div>
                    <p>To: {t.toUser.name}</p>
                    <p>Amount: {t.amount}</p>
                    <p>Date: {new Date(t.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
        <div>
            <h2>Received Transactions</h2>
            {userTransactions?.receivedTransfers?.map((transaction, index) => (
                <div key={index}>
                    <p>From: {transaction.fromUser.name}</p>
                    <p>Amount: ${transaction.amount}</p>
                    <p>Date: {new Date(transaction.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    </div>
}