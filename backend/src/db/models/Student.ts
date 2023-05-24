import { DataTypes, Model, Sequelize, Optional, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";

interface StudentAttributes {
    studentId?: number;
    firstName: string;
    familyName: string;
    dob: Date;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type StudentOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type StudentCreationAttributes = Optional<StudentAttributes, StudentOptionalAttributes>;

export class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public studentId!: number;
    public firstName!: string;
    public familyName!: string;
    public dob!: Date;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static initModel(sequelize: Sequelize): typeof Student {
        return Student.init(
            {
                studentId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                familyName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                dob: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                sequelize: sequelize,
            },
        );
    }
}
