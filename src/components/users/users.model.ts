import { Model, Table, PrimaryKey, Column, AllowNull, NotEmpty, CreatedAt, UpdatedAt, Default } from "sequelize-typescript";

export interface IUser{
    id?: string
    first_name?: string
    last_name?: string
    username?: string
    password?: string
    verified?: boolean
    verified_on?: Date
}

@Table(
    {
        tableName: "users",
        timestamps: true
    }
)
export default class User extends Model implements IUser{
    
    @PrimaryKey
    @Column
    id: string
    
    @AllowNull(false)
    @NotEmpty
    @Column
    first_name!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    username!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

    @CreatedAt
    account_created: Date;

    @UpdatedAt
    account_updated: Date;

    @Default(false)
    @Column
    verified: boolean;

    @Column
    verified_on: Date;

}

