const Result = ({results}) => {

    const rows = [];

    if (results) {
        for (let result of results) {
            rows.push(<tr><td backgroundColor='red'>{result.description}</td><td align='right'>{result.score}%</td></tr>);
        }
    }

    return (
        <table>
            {rows}
        </table>
    )
}

export default Result