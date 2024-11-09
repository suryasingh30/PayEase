import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main(){
    const surya = await prisma.user.upsert({
        where: { number: '1111111111' },
        update: {},
        create: {
            number: '1111111111',
            password: await bcrypt.hash('surya', 10),
            name: 'surya',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20222,
                    token: "token1",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const baldev = await prisma.user.upsert({
        where: { number: '2222222222' },
        update: {},
        create: {
            number: '2222222222',
            password: await bcrypt.hash('baldev', 10),
            name: 'baldev',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20222,
                    token: "token2",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    console.log({surya, baldev});
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })