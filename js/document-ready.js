$(document).ready(function() {
    // Navigation functions
    $('#content-right').cycle({
        fx:                 'blindX',
        speed:              'slow',
        timeout:            0,
        pager:              '#nav',
        pagerAnchorBuilder: function(idx, slide) {
            return '#nav li:eq(' + (idx) + ') a';
        }
    });

    $('#contact-link').click(function() {
        $('#nav li:eq(5) a').triggerHandler('click');
        return false;
    });

    // Contact link handlers
    $('#twitter').click(function(e) {
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = this.href,
            opts = 'status=1' +
                   ',width='  + width +
                   ',height=' + height +
                   ',top='    + top +
                   ',left='   + left;
        
        window.open(url, 'twitter', opts);
        return false;
    });

    // Popup code
    $('.popup-trigger').click(function(e) {
        var offset = $(this).offset();
        var width = $(this).width();
        var left = offset.left + width + $(this).data('distance') + "px";

        $($(this).data('popup')).fadeIn('fast')
            .css('top', offset.top + "px")
            .css('left', left)
            .appendTo('body');
    });

    $('body').mouseup(function() {
        $('.popup').fadeOut('fast');
    });

    // RSVP handlers
    $('#rsvp-code').keyup(function() {
        var code = $(this).val();
        
        if (hex_md5(code) == "2115d6d1964d184b9867a9b452d7e8b7") {
            $('.base-form').fadeIn('fast')
            $(this).attr('readonly', 'readonly');
            $('input:text[name="name"]', '#main-form').focus();
        }
    });

    $('input:radio[name="reception"]', '#main-form').change(function() {
        if ($(this).val() == "yes") {
            $('.reception-form').fadeIn('fast')
        }
        else {
            $('.reception-form, .guest-form').fadeOut('fast');
            resetFormElements($('.guest-form, .reception-form'));
        }
    });

    $('input:radio[name="guest"]', '#main-form').change(function() {
        if ($(this).val() == "yes") {
            $('.guest-form').fadeIn('fast')
        }
        else {
            $('.guest-form').fadeOut('fast');
            resetFormElements($('.guest-form'));
        }
    });

    $('#rsvp-submit').click(function() {
        $('#main-form').submit();
    });

    $('#main-form').submit(function() {
        function popup(message) {
            var submit = $('#rsvp-submit');
            var offset = submit.offset();
            var height = submit.height();
            var top = offset.top + height + 20 + "px";

            $('#submit-popup p').first().text(message);
            Cufon.refresh('p');
            $('#submit-popup').fadeIn('fast')
                .css('top', top)
                .css('left', offset.left + "px")
                .appendTo('body');
        };

        $.post(
            'send-rsvp.php',
            $(this).serialize(),
            function(data){
                if (data == "1") {
                    popup("Your RSVP was sent successfully!");
                }
                else {
                    popup("There was an error sending your RSVP. Please contact us directly");
                }
            }
        );
        return false;
    });

    $('#rsvp-submit').hover(function() {
        $(this).css('color', '#253A7A')
               .css('background', '#FFFFFF');
        Cufon.refresh('p');
    }, function() {
        $(this).css('color', '#FFFFFF')
               .css('background', '#253A7A');
        Cufon.refresh('p');
    })
    .mousedown(function() {
        $(this).css('box-shadow', '0 0 5px 2px #999999 inset');
    })
    .mouseup(function() {
        $(this).css('box-shadow', 'none');
    });
});

function resetFormElements($elems) {
    $elems.find('input:text, select').val('');
    $elems.find('input:radio').removeAttr('selected').removeAttr('checked');
};
