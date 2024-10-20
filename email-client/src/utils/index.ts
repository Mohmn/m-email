function formatDate(timestamp: number) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedTime = `${day}/${month}/${year} ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    return formattedTime;
}

export {
    formatDate
}