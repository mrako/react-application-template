-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
