/* Load More
-----------------------------------------*/
$( document ).ready(function() {

    var pagination_next_url = $('link[rel=next]').attr('href'),
        $load_posts_button  = $('.js-load-posts');

    // Check at the beginning to see if there's any more posts to load.
    if (pagination_available_pages_number == 1) {
        $load_posts_button.addClass('finished');
    } else {
        $load_posts_button.click(function(e) {
            e.preventDefault();

            console.log("clicked");

            var request_next_link = pagination_next_url.split(/page/)[0] + 'page/' + pagination_next_page_number + '/';

            $.ajax({
                url: request_next_link,
                beforeSend: function() {
                $load_posts_button.addClass('icon-loading');
                }
            }).done(function(data) {
            var posts = $('.post-card', data);

            $load_posts_button.removeClass('icon-loading');

            $('.post-feed').append(posts);

            pagination_next_page_number++;

            if (pagination_next_page_number > pagination_available_pages_number) {
                    $load_posts_button.attr('disabled', true).addClass('finished');
            }
            });
        });
    }
 });