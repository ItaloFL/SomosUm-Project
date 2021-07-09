import { MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class views1620785413838 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "views",
                columns:[
                    {
                        name: "view_id",
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
                       name: "ad_id",
                       type: "uuid"
                   },
                   {
                       name: "created_at",
                       type: "timestamp",
                       default: "now()"
                   }
                ],
                foreignKeys : [
                    {
                        name: "FKViewsAds",
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
        await queryRunner.dropTable("views");
        await queryRunner.query('DROP EXTENSION "uuid-ossp" CASCADE'); 
    }

}
