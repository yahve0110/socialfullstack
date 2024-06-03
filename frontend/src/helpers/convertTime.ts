export function formatDateWithoutSeconds(dateTimeString:string) {
    // Create a Date object from the input string
    var date = new Date(dateTimeString);

    // Get the components of the date
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');

    // Construct the formatted date string
    var formattedDate = `${day}.${month}.${year}  ${hours}:${minutes}`;

    return formattedDate;
}



