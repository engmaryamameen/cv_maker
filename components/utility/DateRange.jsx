const DateRange = ({ startYear, endYear, id }) => {
    if (!startYear) {
        return <p id={id} className="sub-content"></p>;
    }

    const start = new Date(startYear);
    const isPresent = endYear === "present";
    const end = isPresent ? null : new Date(endYear);

    const formatDate = (date) =>
        date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();

    return (
        <p id={id} className="sub-content" style={{ whiteSpace: "nowrap" }}>
            {formatDate(start)} – {isPresent ? 'Present' : (end && end.toString() !== "Invalid Date" ? formatDate(end) : 'Present')}
        </p>
    );
};

export default DateRange;
