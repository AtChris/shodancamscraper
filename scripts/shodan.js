$(document).ready(function () {
    /* Get API KEY for Shodan Api */
    let API_KEY = '';
    $.ajax('../key.txt')
        .done(function (data) {
            API_KEY = data;
        });

    $('#searchButton').click(function () {
        var searchValue = $('#searchBox').val();
        searchShodan(searchValue);
    });

    function searchShodan(queryVal) {
        $.get('https://api.shodan.io/shodan/host/search', {
                key: API_KEY,
                query: queryVal
            })
            .done(function (data) {
                var html = '';
                data.matches.forEach(function (match) {
                    html += '<li class="list-group-item">'
                    html +=     '<span class="badge">'
                    html +=         '<i class="fa fa-check" aria-hidden="true"></i>'
                    html +=     '</span>'
                    html +=     (match.product || match.http.server);
                    html += '</li>'
                });

                $('#results').append(html);
            });
    }
});