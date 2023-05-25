import React, { useEffect, useState } from "react";

import PageBase from "../components/pageBase/pageBase";
import { IResult } from "../interface/Result.interface";
import { getAllResultsAPI } from "../api/resultsAPI";

function ResultsListPage() {
    const [resultsList, setResultsList] = useState<IResult[]>([]);

    useEffect(() => {
        getAllResultsAPI().then(response => {
            const results = response.data.results;
            setResultsList(results);
        });
    });

    return (
        <PageBase>
            <div>
                <div>
                    <div className="w-fit ml-8 px-4 pt-2 pb-1 border border-black">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="pr-8">Course </th>
                                    <th>Student</th>
                                    <th>Delete</th>
                                </tr>
                                {resultsList.map((result: IResult) => {
                                    return (
                                        <tr key={result.resultId}>
                                            <td>{result.courseName}</td>
                                            <td>{result.studentName}</td>
                                            <td>{result.score}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageBase>
    );
}

export default ResultsListPage;
