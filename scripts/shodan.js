$(document).ready(function () {
    /* Get API KEY for shodan Api */
    let API_KEY = "";
    $.ajax('../key.txt')
        .done(function (data) {
            API_KEY = data;
        });

    $("#searchButton").click(function () {
        var searchValue = $("#searchBox").val();
        searchShodan(searchValue);
    });




    function searchShodan(queryVal) {
        $.get("https://api.shodan.io/shodan/host/search", {
                key: API_KEY,
                query: queryVal
            })
            .done(function (data) {
                //console.log(data.matches);
                var html = "";

                data.matches.forEach(function (match) {
                    html += (match.product || match.http.server) + "<br>";
                });

                $("#results").html(html);

            });
    }

});