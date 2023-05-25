import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AddCoursesPage from "../pages/AddCoursesPage";
import AddStudentsPage from "../pages/AddStudentsPage";
import AddResultsPage from "../pages/AddResultsPage";
import StudentsListPage from "../pages/StudentsListPage";
import CoursesListPage from "../pages/CoursesListPage";
import ResultsListPage from "../pages/ResultsListPage";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students/add/new" element={<AddStudentsPage />} />
            <Route path="/students/list" element={<StudentsListPage />} />
            <Route path="/courses/add/new" element={<AddCoursesPage />} />
            <Route path="/courses/list" element={<CoursesListPage />} />
            <Route path="/results/add/new" element={<AddResultsPage />} />
            <Route path="/results/list" element={<ResultsListPage />} />
        </Routes>
    );
};
export default PageRoutes;
