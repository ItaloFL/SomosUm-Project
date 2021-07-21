import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Anuncios1620276830651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
       
        await queryRunner.createTable(
            new Table({
                name: "anuncios",
                columns:[
                    {
                        name: "ad_id",
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
                        name: "ad_name",
                        type: "varchar(150)"
                    },
                    {
                        name: "price",
                        type: "varchar"
                    },
                    {
                        name: "price_type",
                        type: "boolean"
                    },
                    {
                        name: "description",
                        type: "varchar(400)"
                    },
                    {
                        name: "categorieID",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name:"photos",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys : [
                    {
                        name: "FKAnunciosUser",
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
        await queryRunner.dropTable('anuncios');
        await queryRunner.query('DROP EXTENSION "uuid-ossp" CASCADE'); 
    }

}
