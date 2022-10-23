

export default async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    const rows = (await response.json()).map((row: { rowKey: number; id: number; }) => {
        row.rowKey = row.id - 1;
        return row;
    });

    const columnNames = Object.keys(rows[0]).filter((key) => key !== 'rowKey');
    console.log('columnNames: ', columnNames);

    return {rows, columnNames};
};