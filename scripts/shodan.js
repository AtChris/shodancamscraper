$(document).ready(function () {
    /* Get API KEY for shodan Api */
    let API_KEY = "";
    $.ajax('../key.txt')
        .done(function (data) {
            API_KEY = data;
        });
});