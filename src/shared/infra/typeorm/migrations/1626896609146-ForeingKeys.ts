import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ForeingKeys1626896609146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey("anuncios", new TableForeignKey(
        {
        name: "FKAnunciosCategories",
        referencedTableName: "categories",
        referencedColumnNames: ["categorieID"],
        columnNames: ["categorieID"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL" 
    }));
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("anuncios", "FKAnunciosCategories")
    }

}
