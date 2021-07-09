import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1620274656060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [{
                    name: "user_id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "email",
                    type: "varchar(256)",
                    isUnique: true

                },
                {
                    name: "passwd",
                    type: "varchar(128)"
                },
                {
                    name: "genero",
                    type: "boolean"
                },
                {
                    name: "username",
                    type: "varchar(40)"
                },
                {
                    name: "whatsapp",
                    type: "varchar(30)"
                },
                {
                    name: "data_nascimento",
                    type: "varchar(20)"
                },
                {
                    name: "church",
                    type: "varchar(100)"
                },
                {
                    name: "CPF",
                    type: "varchar(15)",
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: "CNPJ",
                    type: "varchar(24)",
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: "isCNPJ",
                    type: "boolean"
                },
                {
                    name: "isAdmin",
                    type: "boolean"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "photo",
                    type: "varchar",
                    isNullable: true,
                }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
       
    }

}
