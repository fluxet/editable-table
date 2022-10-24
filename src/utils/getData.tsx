export default async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const response = await fetch(url);
        const rows = (await response.json()).map((row: { rowKey: number; id: number; }) => {
            row.rowKey = row.id - 1;
            return row;
        });

        const columnNames = Object.keys(rows[0]).filter((key) => key !== 'rowKey');

        return { rows, columnNames };
    } catch (err) {
        throw new Error(err);
    }
};
