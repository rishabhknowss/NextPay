import { Card } from "@repo/ui/card";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";

async function getTransactionsP2P() {
  const session = await getServerSession(authOptions);
  const p2ptxn = await prisma.p2pTransfer.findMany({
    where: {
      fromUser: {
        id: Number(session?.user?.id)
      },
    },
    include: {
      toUser: {
        select: {
          name: true,
        },
      },
    },
  });
  return p2ptxn.map((p) => ({
    time: p.timestamp,
    amount: p.amount,
    toUser: p.toUser.name || 'Unknown User',
  }));
}

export default async function () {
  const transactions = await getTransactionsP2P()
  return (
    <div className="w-full grid grid-cols-2 ">
      <SendCard />
      <P2pTransactions transactions={transactions}/>
    </div>
  );
}