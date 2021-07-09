import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Categories1620281388588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns:[
                    {
                        name: "categorieID",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: "categorieName",
                        type: "varchar(100)"
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories")
        await queryRunner.query('DROP EXTENSION "uuid-ossp" CASCADE')
    }
}
