CREATE TABLE "tasksTable"(
    "id" SERIAL PRIMARY KEY,
    "status"VARCHAR(20),
    "task" VARCHAR(250) NOT NULL,
    "dueDate" DATE NOT NULL
);

INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Finish the weekend challenge','03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Do your laundry', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Study and read some books', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Buy some Groceries', '03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Practice meditation and self-reflection', '03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Write some poems', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Clean the kitchen', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Get your room in order', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('Task Not Completed','Cook some food', '03/28/2020');

SELECT * FROM "tasksTable" ORDER BY "id";
 
    