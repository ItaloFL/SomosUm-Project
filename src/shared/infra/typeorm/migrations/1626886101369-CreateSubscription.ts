import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSubscription1626886101369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: "subscription",
            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "paid",
                    type: "boolean",
                    default: true
                },
                {
                    name: "expire_date",
                    type: "timestamp",
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
                    name: "FKSubscriptionUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["user_id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                },
            ]
        })
      )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("subscription");
    }

}
