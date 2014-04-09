ViewModel = function() {
    this.step = ko.observable(1);

    this.next_step = function() {
        this.step(this.step() + 1);
        if (this.step() == 2)
            init_carousel();
    };

    this.prev_step = function() {
        this.step(this.step() - 1);
    };

    this.prev_enabled = ko.computed(function() {
        return true;
    }, this);

    this.next_enabled = ko.computed(function() {
        return true;
    }, this);
};


function init_carousel() {
    $(function() {
        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#photo_img').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
        $('#photo_img').show();
    }
}


$(function() {
    ko.applyBindings(new ViewModel);
    $("#photo_file").change(function(){
        readURL(this);
    });
});