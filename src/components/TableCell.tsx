import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hook";
import { updateContent } from "../tableSlice";

interface Row {
    rowKey: number;
    [key: string]: string | number; 
};

interface TableCellProps {
    row: Row;
    name: string;
};

const TableCell = ({row, name}:TableCellProps) => {
    const dispatch = useAppDispatch();
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
            dispatch(updateContent({
                rowKey: row.rowKey,
                name,
                content,
            }))
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