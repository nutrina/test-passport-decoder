// src/index.ts
import { Contract, ethers } from "ethers";
import PassportDecoderABIs from "./abi/GitcoinPassportDecoder.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const CHAIN_ID = "0x2b03";

const decoderAddress = "0x2050256A91cbABD7C42465aA0d5325115C1dEB43";
const passportDecoderABI = PassportDecoderABIs[CHAIN_ID];

async function main() {
  const passportDecoder = new Contract(
    decoderAddress,
    passportDecoderABI,
    provider
  );

  const providers = await passportDecoder.getProviders(0);
  console.log("providers: ", providers);

  const recipients = [
    "0x70FEEEC90D37dc73D9deD8cfAfd7edE3F697b70B",
    "0x0F9acF892C809d27d9CD14059aADa68B343d0412",
  ];

  for (var i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    console.log("\n\nChecking recipient: ", recipient);
    const passport = await passportDecoder.getPassport(recipient);
    console.log("passport: ", passport);

    const score = await passportDecoder.getScore(recipient);
    console.log("score: ", score);
  }
}

main();
