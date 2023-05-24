import { DataTypes, Model, Sequelize, Optional, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";

interface CourseAttributes {
    courseId: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type CourseOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type CourseCreationAttributes = Optional<CourseAttributes, CourseOptionalAttributes>;

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
    public courseId!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


    static initModel(sequelize: Sequelize): typeof Course {
        return Course.init(
            {
                courseId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
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
