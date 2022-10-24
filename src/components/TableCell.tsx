import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

type Row = {
    rowKey: number;
    [key: string]: string | number; 
};

type TableCellProps = {
    row: Row;
    name: string;
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
};

const TableCell = ({row, name, setRows}:TableCellProps) => {
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
            setRows((prev) => {
                prev[row.rowKey][name] = content;
                return [...prev];
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