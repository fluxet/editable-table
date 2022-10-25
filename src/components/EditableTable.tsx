import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import TableCell from "./TableCell";
import { setData, sort } from "../tableSlice";
import getUrl from "../routes";

const EditableTable = () => {
    const dispatch = useAppDispatch();
    const columnNames = useAppSelector((state) => state.table.columnNames);
    const rows = useAppSelector((state) => state.table.rows);
    const errorMessage = useAppSelector((state) => state.table.errorMessage);

    const onColumnHeaderClick = (name: string) => () => {
        dispatch(sort({name}));
    };

    useEffect(() => {
        const url = getUrl();
        dispatch(setData({url}));
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
