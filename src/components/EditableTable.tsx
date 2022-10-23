import React, { useEffect, useState } from "react";
import getData from "../utils/getData";
import TableCell from "./TableCell";

const EditableTable = () => {
    const [data, setData] = useState({ rows: [], columnNames: [] });

    const onColumnHeaderClick = (name: string) => () => {
        setData(prev => {
            prev.rows.sort((a, b) => (a[name] > b[name]) ? 1 : -1);
            return { rows: prev.rows, columnNames: prev.columnNames };
        });
    };

    useEffect(() => {
        getData().then(setData);
    }, []);

    return (
        <table className="editable-table">
            <thead>
                <tr title="click to sort">
                    {data.columnNames.map((name) => <td onClick={onColumnHeaderClick(name)} key={name}>{name}</td>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row) => (
                    <tr key={row.rowKey}>
                        {data.columnNames.map((name) => <TableCell
                            key={`${row.rowKey}_${name}`}
                            setData={setData}
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
