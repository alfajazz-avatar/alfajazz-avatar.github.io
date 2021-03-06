WIDTH = 203;
HEIGHT = 250;

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
        var params = {
            watermark: $('.jcarousel').jcarousel('first').find('img').attr('src'),
            photo: $('#photo_img').attr('src')
        };
        loading_start();
        $.post('http://mif.webfactional.com/php/generator.php', params, function (data) {
            $('.watermark').attr('src', data);
            $('#watermark_download').attr('href', data);
            loading_end();
        });
    };

    this.upload = function() {
        loading_start();
        VK.api('photos.getProfileUploadServer', {}, function(data) {
            var params = {
                url: data.response.upload_url,
                data: $('.watermark').attr('src')
            };
            $.post('http://mif.webfactional.com/php/loader.php', params, function(data) {
                data = JSON.parse(data);
                loading_end();
                VK.api('photos.saveProfilePhoto', data);
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
            showPhotoResizer(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


function Dialog($dialog) {
    var self = this;
    this.$dialog = $dialog;
    this.captionOK = "OK";
    this.width = null;
    this.show = function () {
        var params = {
            dialogClass: "no-close",
            create: function (event, ui) {
            },
            buttons: [
                {
                    text: "Відміна",
                    click: function() {self.onCancel(); }
                },
                {
                    text: this.captionOK,
                    click: function() {self.onOK(); }
                }
            ]
        };
        if (this.width) params.width = this.width;
        this.$dialog.dialog(params);
    };
    this.hide = function () {
        this.$dialog.dialog( "close" );
    };
    this.onOK = function () {

    };
    this.onCancel = function () {
        this.hide();
    };
}


function showPhotoResizer(url) {
    var $dialog = $('#photoCropForm');
    var coords = null;
    $dialog.empty().append('<img src="">');

    var dialog = new Dialog($dialog);
    dialog.width = 440;
    dialog.captionOK = 'Обрізати';
    dialog.onOK = function () {
        if (!coords)
            return;

        var formData = new FormData(document.getElementById('form'));
        formData.append('coords', JSON.stringify(coords));
        loading_start();
        $.ajax({
            url: 'http://mif.webfactional.com/php/resizer.php',
            type: 'POST',
            data: formData,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $('#photo_img').attr('src', data);
                dialog.hide();
                loading_end();
                vm.isset_foto(true);
            }
        });
    };

    function setCoords(c) {
        coords = c;
    }

    $('img', $dialog).bind("load", function (){
        $(this).Jcrop({
            boxWidth: 400,
            setSelect: [0, 0, this.width, this.height],
            aspectRatio: 1,
            onSelect: setCoords,
            onChange: setCoords
        });
        dialog.show();
    }).attr('src', url);
}


function set_sizes(selector) {
    $(selector).width(WIDTH).height(HEIGHT);
}


function loading_start() {
    $("#overlay").show();
}

function loading_end() {
    $("#overlay").hide();
}


$(function() {
    set_sizes('.jcarousel img');
    set_sizes('img.watermark');

    vm = new ViewModel;
    ko.applyBindings(vm);
    $("#photo_file").change(function(){
        readURL(this);
    });
    VK.init(function() {
         console.log('vk init ok');
        }, function() {
         console.log('vk init failed');
    }, '5.19');
});