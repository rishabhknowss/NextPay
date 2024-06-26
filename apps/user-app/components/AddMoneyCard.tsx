"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
  }
];

export const AddMoney = () => {
  const [isClient, setIsClient] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => setAmount(Number(e))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
            setRedirectUrl(selectedBank?.redirectUrl || "");
            setProvider(selectedBank?.name || "");
          }}
          options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              window.location.href = redirectUrl || "";
              await createOnRampTransaction(provider, amount);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};