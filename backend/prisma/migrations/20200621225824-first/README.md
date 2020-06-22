# Migration `20200621225824-first`

This migration has been generated at 6/21/2020, 10:58:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "public"."User" (
"blacklisted" boolean   DEFAULT false,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text   ,"firstName" text   ,"id" text  NOT NULL ,"lastName" text   ,"phone" text   ,"role" "Role" NOT NULL DEFAULT E'USER',"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Post" (
"author" text   ,"content" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"published" boolean  NOT NULL ,"title" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Session" (
"data" text  NOT NULL ,"expires" timestamp(3)  NOT NULL ,"id" text  NOT NULL ,"sid" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.phone" ON "public"."User"("phone")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Session.sid" ON "public"."Session"("sid")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200621225824-first
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,52 @@
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DB_URL")
+}
+
+
+generator client {
+  provider  = "prisma-client-js"
+}
+
+
+enum Role {
+  USER
+  ADMIN
+}
+
+
+model User {
+  id            String   @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  blacklisted   Boolean? @default(false)
+  phone         String?  @unique
+  email         String?  @unique
+  firstName     String?
+  lastName      String?
+  role          Role     @default(USER)
+  posts         Post[]
+}
+
+
+model Post {
+  id        String    @id
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  published Boolean
+  title     String
+  content   String?
+  author    User?     @relation(fields: [authorId], references: [id])
+  authorId  String?   @map("author") // relation scalar field (used in the `@relation` attribute above)
+}
+
+
+model Session {
+  id        String   @id
+  sid       String   @unique // In case session and db ids ever must differ 
+  data      String
+  expires   DateTime  // JS/TS Date() timestamp
+}
+
+
```


