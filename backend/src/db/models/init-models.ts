import { Sequelize } from "sequelize";
//
import { Course as _Course } from "./Course";
import { Student as _Student } from "./Student";
import { Result as _Result } from "./Result";
import { Notification as _Notification } from "./Notification";

function initModels(sequelize: Sequelize) {
    const Course = _Course.initModel(sequelize);
    const Student = _Student.initModel(sequelize);
    const Result = _Result.initModel(sequelize);
    const Notification = _Notification.initModel(sequelize);

    Course.hasMany(Result, {
        foreignKey: "courseId",
        as: "associated_course",
    });
    Result.belongsTo(Result, { as: "result_for_course", foreignKey: "courseId" });

    Student.hasMany(Result, {
        foreignKey: "studentId",
        as: "associated_student",
    });
    Result.belongsTo(Result, { as: "result_for_student", foreignKey: "studentId" });

    return { Result, Course, Student, Notification };
}

export default initModels;
