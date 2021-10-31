import { Model, Table, PrimaryKey, Column, AllowNull, NotEmpty, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

export interface IImage{
    id?: string
    file_name?: string
    url?: string
    user_id?: string
    metaData?:any
}

@Table(
    {
        tableName: "images",
        timestamps: true
    }
)
export default class Image extends Model implements IImage{
    
    @PrimaryKey
    @Column
    id: string
    
    @AllowNull(false)
    @NotEmpty
    @Column
    file_name!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    url!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    user_id!: string;

    @AllowNull(false)
    @Column(DataType.JSON)
    metaData!: any;

    @CreatedAt
    upload_date: Date;

}
