-- CreateTable
CREATE TABLE "dice" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "gameEnd" BOOLEAN NOT NULL DEFAULT false,
    "betAmount" INTEGER NOT NULL DEFAULT 0,
    "newBetAmount" INTEGER NOT NULL DEFAULT 0,
    "diceVal" DECIMAL(4,2) NOT NULL DEFAULT 50.0,

    CONSTRAINT "dice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dice" ADD CONSTRAINT "dice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
