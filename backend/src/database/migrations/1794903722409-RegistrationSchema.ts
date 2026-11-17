import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RegistrationSchema1794903722409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
                            new Table({
                                name : 'registrations',
                                columns : [
                                    {
                                        name : 'id',
                                        type : 'integer',
                                        isPrimary: true,
                                        isGenerated : true,
                                        generationStrategy: 'increment'
                                    },
                                    {
                                        name : 'userId',
                                        type : 'integer',
                                    },
                
                                    {
                                        name : 'eventId',
                                        type : 'integer',
                                    },
                
                                    {
                                        name : 'status',
                                        type : 'enum',
                                        enum : ['active', 'blocked'],
                                        default : "'active'"
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
                                        name : 'fk_user_attendee',
                                        columnNames : ['userId'],
                                        referencedColumnNames : ['id'],
                                        referencedTableName : 'users'
                                    },
                                    {
                                        name : 'fk_event_attendee',
                                        columnNames : ['eventId'],
                                        referencedColumnNames : ['id'],
                                        referencedTableName : 'events'
                                    }
                                ]
                            })
                        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('registrations')
    }

}
