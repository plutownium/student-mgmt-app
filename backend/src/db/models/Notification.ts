import { DataTypes, Model, Sequelize, Optional, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";

interface NotificationAttributes {
    notificationId: number;
    text: string;
    seen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type NotificationOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type NotificationCreationAttributes = Optional<NotificationAttributes, NotificationOptionalAttributes>;

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    public notificationId!: number;
    public text!: string;
    public seen!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


    static initModel(sequelize: Sequelize): typeof Notification {
        return Notification.init(
            {
                notificationId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                text: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                seen: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
            },
            {
                timestamps: true,
                sequelize: sequelize,
            },
        );
    }
}
