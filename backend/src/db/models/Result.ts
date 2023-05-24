import { DataTypes, Model, Sequelize, Optional, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";
import { Course } from "./Course";
import { Student } from "./Student";

interface ResultAttributes {
    resultId?: number;
    courseId?: number | null;
    studentId?: number | null;
    score: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type ResultOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type ResultCreationAttributes = Optional<ResultAttributes, ResultOptionalAttributes>;

export class Result extends Model<ResultAttributes, ResultCreationAttributes> implements ResultAttributes {
    public resultId!: number;
    public courseId!: ForeignKey<Course["courseId"]>;
    public studentId!: ForeignKey<Student["studentId"]>;
    public score!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static initModel(sequelize: Sequelize): typeof Result {
        return Result.init(
            {
                resultId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                score: {
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
