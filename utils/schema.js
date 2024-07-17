import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
    id: serial("id").primaryKey(),
    jsonMockResp : text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDesc: varchar("jobDesc").notNull(),
    jobExp: varchar("jobExp").notNull(),
    createdBy: varchar("createdBy").notNull(),
    createdAt: varchar("createdAt").notNull(),
    mockId: varchar("mockId").notNull()
})

export const UserAnswer = pgTable("userAnswer", {
    id: serial("id").primaryKey(),
    mockId: varchar("mockId").notNull(),
    question: varchar('question').notNull(),
    correctAns: text("correctAns"),
    userAns: text("userAns"),
    feedback: text("feedback"),
    rating: varchar("rating").notNull(),
    userEmail: varchar("userEmail"),
    createdAt: varchar("createdAt")
})