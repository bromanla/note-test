/*
PostgreSQL Backup
Database: notes/public
Backup Time: 2022-04-24 23:42:09
*/

DROP SEQUENCE IF EXISTS "public"."image_id_seq";
DROP SEQUENCE IF EXISTS "public"."note_id_seq";
DROP TABLE IF EXISTS "public"."image";
DROP TABLE IF EXISTS "public"."note";
CREATE SEQUENCE "image_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE SEQUENCE "note_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE TABLE "image" (
  "id" int4 NOT NULL DEFAULT nextval('image_id_seq'::regclass),
  "path" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createdDate" timestamp(6) NOT NULL DEFAULT now(),
  "updatedDate" timestamp(6) NOT NULL DEFAULT now(),
  "noteId" int4
)
;
ALTER TABLE "image" OWNER TO "postgres";
CREATE TABLE "note" (
  "id" int4 NOT NULL DEFAULT nextval('note_id_seq'::regclass),
  "text" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdDate" timestamp(6) NOT NULL DEFAULT now(),
  "updatedDate" timestamp(6) NOT NULL DEFAULT now()
)
;
ALTER TABLE "note" OWNER TO "postgres";
BEGIN;
LOCK TABLE "public"."image" IN SHARE MODE;
DELETE FROM "public"."image";
COMMIT;
BEGIN;
LOCK TABLE "public"."note" IN SHARE MODE;
DELETE FROM "public"."note";
INSERT INTO "public"."note" ("id","text","createdDate","updatedDate") VALUES (1, '<h3>Привет!&nbsp;</h3><p>&nbsp;</p><p>Необходимо создать приложение Заметки на языке программирования, который вы&nbsp;больше всего предпочитаете. Приложение может быть сделано как в консольном виде,&nbsp;так и в браузере или в виде приложения на Android, iOS. Строгих требований к реализации и функциональности нет, будьте творческими! Нам&nbsp;главное посмотреть, как вы подходите к задаче и какие <a href="https://github.com/bromanla">инструменты</a> в разработке&nbsp;&nbsp;используете.&nbsp;</p>', '2022-04-24 20:40:56.649074', '2022-04-24 20:41:17.558112');
COMMIT;
ALTER TABLE "image" ADD CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id");
ALTER TABLE "note" ADD CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id");
ALTER TABLE "image" ADD CONSTRAINT "FK_9c2a4d4425fac2364d2827cf7c8" FOREIGN KEY ("noteId") REFERENCES "public"."note" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER SEQUENCE "image_id_seq"
OWNED BY "image"."id";
SELECT setval('"image_id_seq"', 2, false);
ALTER SEQUENCE "image_id_seq" OWNER TO "postgres";
ALTER SEQUENCE "note_id_seq"
OWNED BY "note"."id";
SELECT setval('"note_id_seq"', 2, true);
ALTER SEQUENCE "note_id_seq" OWNER TO "postgres";
