-- CreateTable
CREATE TABLE "tasks" (
    "task_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "due_date" DATETIME
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "task_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
