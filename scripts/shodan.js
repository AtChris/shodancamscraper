$(document).ready(function () {
    /* Get API KEY for Shodan Api */
    let API_KEY = '';
    $.ajax('../key.txt')
        .done(function (data) {
            API_KEY = data;
        });

    /* When API is clicked, take value in search box and pass to searchShodan function */
    $('#searchButton').click(function () {
        var searchValue = $('#searchBox').val();
        searchShodan(searchValue);
    });

    /* Calls Shodan search api with specified search value, adds the results to a bootstrap list */
    function searchShodan(queryVal) {
        $.get('https://api.shodan.io/shodan/host/search', {
                key: API_KEY,
                query: queryVal
            })
            .done(function (data) { //when done, use the data
                var html = '';
                data.matches.forEach(function (match) { //for each match, add its name
                    html += '<li class="list-group-item">'
                    html +=     '<span class="badge">'
                    html +=         '<i class="fa fa-check" aria-hidden="true"></i>'
                    html +=     '</span>'
                    html +=     (match.product || match.http.server);
                    html += '</li>'
                });

                $('#results').append(html); //add all the matches to the page
            });
    }
});