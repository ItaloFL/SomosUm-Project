import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class Sessions1620527063894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(
            new Table({
                name: "sessions",
                columns:[
                    {
                        name: "session_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "login",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "logout",
                        type: "timestamp",
                        isNullable: true,
                        default: null,
                    }
                ],
                foreignKeys : [
                    {
                        name: "FKSessionsUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL" 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sessions")
        await queryRunner.query('DROP EXTENSION "uuid-ossp" CASCADE')
    }

}
