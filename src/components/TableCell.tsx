import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

type Row = {
    rowKey: number;
    [key: string]: string | number; 
};

type Data = {
    rows: Row[];
    columnNames: string[];
};

type TDProps = {
    row: Row;
    name: string;
    setData: React.Dispatch<React.SetStateAction<Data>>
};

const TableCell = ({row, name, setData}:TDProps) => {
    const initialValue = row[name];
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const cellType = (typeof initialValue === 'number') ? 'number' : 'text';
    const cellTitle = (isEditing) ? 'Enter to save' : 'double click to edit';

    const onCellEdit = () => {  
        setIsEditing(true);
    };

    const onCellCancel = () => {
        setIsEditing(false);
        setContent(initialValue);
    };

    const onCellEnter = (evt: { key: string; }) => {
        if (evt.key === 'Enter') {
            setData((prev) => {
                prev.rows[row.rowKey][name] = content;
                return {rows: prev.rows, columnNames: prev.columnNames};
            })
            setIsEditing(false);
        }
    };
    
    const onInputChange = (evt: SyntheticEvent<HTMLInputElement>) => {
        const { value } = evt.target as HTMLInputElement;
        const updatedValue = (cellType === 'number') ? +value : value;
        setContent(updatedValue);
    };

    useEffect(() => {
        inputRef?.current?.focus();
    }, [isEditing]);

    return (
        <td title={cellTitle} className={cellType} onDoubleClick={onCellEdit} onBlur={onCellCancel}>
            {isEditing
                ? <input type={cellType} ref={inputRef} onChange={onInputChange} onKeyDown={onCellEnter} value={content} />
                : content
            }
        </td>
    );
};

export default TableCell;