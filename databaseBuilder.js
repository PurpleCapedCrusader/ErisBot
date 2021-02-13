const config = require("./config.json");
var dbCreds = require('./dbCreds.js');
const {
    Pool
} = require('pg');
const pool = new Pool(dbCreds);

async function createSchemaIfNotExist() {
    ;
    (async () => {
        const client = await pool.connect()
        try {

            await client.query(`CREATE SCHEMA IF NOT EXISTS eris_schema AUTHORIZATION ${config.connUser};`)

            await client.query(`CREATE TABLE IF NOT EXISTS eris_schema.dm_archive
            (
                dm_archive_id SERIAL NOT NULL,
                readable_timestamp character varying COLLATE pg_catalog."default",
                author_username character varying COLLATE pg_catalog."default",
                author_id bigint,
                message_timestamp bigint,
                message_content character varying COLLATE pg_catalog."default",
                CONSTRAINT dm_archive_pkey PRIMARY KEY (dm_archive_id)
            )
            WITH (
                OIDS = FALSE
            )
            TABLESPACE pg_default;
            
            ALTER TABLE eris_schema.dm_archive
                OWNER to ${config.connUser};`)

            await client.query(`CREATE TABLE IF NOT EXISTS eris_schema.message_archive
            (
                messagearchive_id SERIAL NOT NULL,
                readable_timestamp character varying(30) COLLATE pg_catalog."default",
                guild_name character varying(32) COLLATE pg_catalog."default",
                guild_id bigint,
                channel_name character varying(32) COLLATE pg_catalog."default",
                channel_id bigint,
                message_id bigint,
                author_id bigint,
                author_username character varying(32) COLLATE pg_catalog."default",
                member_nickname character varying(32) COLLATE pg_catalog."default",
                message_timestamp bigint,
                message_content character varying(2000) COLLATE pg_catalog."default",
                CONSTRAINT message_archive_pkey PRIMARY KEY (messagearchive_id)
            )
            WITH (
                OIDS = FALSE
            )
            TABLESPACE pg_default;
            
            ALTER TABLE eris_schema.message_archive
                OWNER to ${config.connUser};`)

            await client.query(`CREATE TABLE IF NOT EXISTS eris_schema.online_role_tracking
            (
                onlineroletracking_id SERIAL NOT NULL,
                guild_name character varying(100) COLLATE pg_catalog."default",
                guild_id bigint,
                channel_name character varying(32) COLLATE pg_catalog."default",
                channel_id bigint,
                message_id bigint,
                author_username character varying(50) COLLATE pg_catalog."default",
                author_id bigint NOT NULL,
                member_nickname character varying COLLATE pg_catalog."default",
                temp_role text COLLATE pg_catalog."default",
                temp_role_id bigint,
                readable_timestamp character varying(30) COLLATE pg_catalog."default",
                start_time bigint NOT NULL,
                duration_requested integer NOT NULL,
                remove_time bigint,
                status boolean NOT NULL,
                CONSTRAINT online_role_tracking_pkey PRIMARY KEY (onlineroletracking_id)
            )
            WITH (
                OIDS = FALSE
            )
            TABLESPACE pg_default;
            
            ALTER TABLE eris_schema.online_role_tracking
                OWNER to ${config.connUser};`)
        } catch (e) {
            await client.query('ROLLBACK')
            console.log(e)
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => console.log(err.stack))
}

module.exports = createSchemaIfNotExist();