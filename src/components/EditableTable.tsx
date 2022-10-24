import React, { useEffect, useState } from "react";
import getData from "../utils/getData";
import TableCell from "./TableCell";

const EditableTable = () => {
    const [columnNames, setColumnNames] = useState([]);
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const onColumnHeaderClick = (name: string) => () => {
        setRows((prev) => {
            prev.sort((a, b) => (a[name] > b[name]) ? 1 : -1);
            return [...prev];
        });
    };

    useEffect(() => {
        getData()
            .then(({rows, columnNames}) => {
                setColumnNames(columnNames);
                setRows(rows);
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    }, []);

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    return (
        <table className="editable-table">
            <thead>
                <tr title="click to sort">
                    {columnNames.map((name) => <td onClick={onColumnHeaderClick(name)} key={name}>{name}</td>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.rowKey}>
                        {columnNames.map((name) => <TableCell
                            key={`${row.rowKey}_${name}`}
                            setRows={setRows}
                            row={row}
                            name={name}
                        />)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EditableTable;
