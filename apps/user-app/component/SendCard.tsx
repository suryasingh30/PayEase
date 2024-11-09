"use client"

import {Button} from "@repo/ui/button";
import {Card} from "@repo/ui/card";
import {Center} from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "app/lib/actions/p2pTransfer";

export function SendCard(){

    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div>
            <Center>
                <Card title={"Send"}>
                    <div className="min-w-72 pt-">
                        <TextInput placeholder={"Number"} label="Number" onChange={(value)=>{
                            setNumber(value);
                        }}>
                        </TextInput>
                        <TextInput placeholder={"Amount"} label="Number" onChange={(value)=>{
                            setAmount(value);
                        }}>
                        </TextInput>
                        <div className="pt4 flex justify-center">
                            <Button onClick={async()=>{
                                await p2pTransfer(number, Number(amount) * 100)
                            }}>
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )

}