ViewModel = function() {
    this.step = ko.observable(1);
    this.isset_foto = ko.observable();

    this.next_step = function() {
        this.step(this.step() + 1);
        if (this.step() == 2)
            init_carousel();
        if (this.step() == 3)
            create_img();
    };

    this.prev_step = function() {
        this.step(this.step() - 1);
    };

    this.prev_enabled = ko.computed(function() {
        return true;
    }, this);

    this.next_enabled = ko.computed(function() {
        if (this.step() == 1)
            return this.isset_foto();
        return true;
    }, this);

    this.upload = function() {
        VK.api('photos.getProfileUploadServer', {}, function(data) {
            console.log(data);
        });
    };
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


function create_img() {
    $('.watermark').attr('src', $('#photo_img').attr('src'));
    wmark.init({
        //"position": "top-right", // default "bottom-right"
        "opacity": 100, // default 50
        "path": $('.jcarousel').jcarousel('first').find('img').attr('src')
    });
}


$(function() {
    var vm = new ViewModel;
    ko.applyBindings(vm);
    $("#photo_file").change(function(){
        readURL(this);
        vm.isset_foto(true);
    });
    VK.init(function() {
         console.log('vk init ok');
        }, function() {
         console.log('vk init failed');
    }, '5.19');
});