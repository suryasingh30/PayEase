"use client"
import {Button} from "@repo/ui/button";
import {Card} from "@repo/ui/card";
import {Center} from "@repo/ui/center";
import {Select} from "@repo/ui/select";
import {useState} from "react";
import {TextInput} from "@repo/ui/textInput";
import {onCreateRamptransaction} from "../app/lib/actions/createOnrampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
},{
    name: "Axis Bank",
    redirectUrl: "https://axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl,setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [provider, setProviders] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState<number>(0);
    return <Card title="Add Money">
        <div className="w-full">
            <input
                placeholder={"Amount"}
                onChange={(e)=>{
                    const newValue = parseFloat(e.target.value);
                    if(!isNaN(newValue)){
                        setValue(newValue);
                    }
                }}
            />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value)=>{
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProviders(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))}/>
            <div className="flex justify-center pt-4">
                <Button onClick={async()=>{
                    await onCreateRamptransaction(provider, value)
                    window.location.href = redirectUrl || ""; 
                }}>
                Add Money here
                </Button>
            </div>
        </div>
    </Card>
}


