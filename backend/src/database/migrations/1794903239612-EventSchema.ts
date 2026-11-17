import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class EventSchema1794903239612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name : 'events',
                        columns : [
                            {
                                name : 'id',
                                type : 'integer',
                                isPrimary: true,
                                isGenerated : true,
                                generationStrategy: 'increment'
                            },
                            {
                                name : 'title',
                                type : 'varchar',
                            },
        
                            {
                                name : 'description',
                                type : 'text',
                            },
        
                            {
                                name : 'publish',
                                type : 'boolean',
                                default : false
                            },
        
                            {
                                name : 'organizerId',
                                type : 'integer',
                                isNullable : false
                            },
                            
                            {
                                name : 'startTime',
                                type : 'timestamp',
                            }, 

                            {
                                name : 'location',
                                type : 'varchar',
                            }, 


                            {
                                name : 'endTime',
                                type : 'timestamp',               
                            }, 

                            {
                                name : 'createdAt',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }, 
        
                            {
                                name : 'updatedAt',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }
                        ],
                        foreignKeys : [
                            {
                                name : 'fk_event_orgainser',
                                columnNames : ['organizerId'],
                                referencedColumnNames : ['id'],
                                referencedTableName : 'users'
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events')
    }

}
