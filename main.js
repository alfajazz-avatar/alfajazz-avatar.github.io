ViewModel = function() {
    this.step = ko.observable(1);
    this.isset_foto = ko.observable();

    this.next_step = function() {
        this.step(this.step() + 1);
        if (this.step() == 2)
            init_carousel();
        if (this.step() == 3)
            this.create_img();
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

    this.create_img = function() {
        var self = this;

        var formData = new FormData(document.getElementById('form'));
        formData.append('watermark', $('.jcarousel').jcarousel('first').find('img').attr('src'));

        $.ajax({
            url: 'http://mif.webfactional.com/php/generator.php',
            type: 'POST',
            data: formData,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $('.watermark').attr('src', data);
            }
        });
    };

    this.upload = function() {
        VK.api('photos.getProfileUploadServer', {test_mode: true}, function(data) {
            /*var formData = new FormData();
            formData.append('file', $('.watermark').attr('src'));
            $.post(data.response.upload_url, formData, function(data) {
                console.log(data);
            });*/


            var params = {
                //url: data.response.upload_url,
                url: "http://cs411920.vk.com/upload.php?_query=eyJhY3QiOiJvd25lcl9waG90byIsInNhdmUiOjEsImFwaV93cmFwIjp7InNlcnZlciI6OTk5LCJwaG90byI6IntyZXN1bHR9IiwibWlkIjoyMzE0ODUyLCJoYXNoIjoiNzQ0OGY5M2Y0MDVkZmQ1YzQ0NGY1ZDRhYWJiODQ5NDIiLCJtZXNzYWdlX2NvZGUiOjIsInByb2ZpbGVfYWlkIjotNn0sIm9pZCI6MjMxNDg1MiwibWlkIjoyMzE0ODUyLCJzZXJ2ZXIiOjQxMTkyMCwiX29yaWdpbiI6Imh0dHBzOlwvXC92ay5jb20iLCJfc2lnIjoiNDY3MDY2OGIzYTdjOTExMTM4NWQyYjA4ZGI5YmU0MWQifQ",
                data: $('.watermark').attr('src')
            };
            //var params = {data: 1};
            $.post('http://aljazazzserv.hdd1.ru/', params, function(data) {
                console.log(data);
                var res = JSON.parse(data.split('}')[0] + '}');
                console.log(res);
            });
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