

$(function () {

    $("#eyes").click(function () {
        if ($("#eyes i").hasClass("fa fa-eye-slash")) {
            $("#Password").attr('type', 'text');
            $("#eyes i").addClass("fa-eye");
            $("#eyes i").removeClass("fa-eye-slash");
        }
        else {
            $("#Password").attr('type', 'password');
            $("#eyes i").removeClass("fa-eye");
            $("#eyes i").addClass("fa-eye-slash");
        }
    });

    $("#lnkmanifest").attr("src", '~/manifestUU.webmanifest');

    var config = $("#hdnMsg").val();
    var IsOnline = $("#checkOnline").val();
    var clientimg = document.getElementById('imgclient');
    var url = window.location.href;

    $('#msgID').text("");

    FillimageCaptcha();
    $("#dvforgotid").show();

   
    $('#login-full-wrapper').css({ 'background-image': 'url(../../Images/LoginImg/UUHome.jpg)', 'background-repeat': 'none' });
    if ($("#checkOnline").val() == "1") {
        clientimg.style.height = '70px';
        clientimg.style.width = '200px';
    } else {
        clientimg.style.height = '90px';
        clientimg.style.width = '90px';
    }


    $("#srcicon").attr("href", "../icon/UUico.ico");
    $("#newstudentlogin").show();

    $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
        var data = JSON.parse(JSON.stringify(data, null, 2));
        var _req = data["geoplugin_request"] + '~' + data["geoplugin_city"] + '~' + data["geoplugin_countryName"] + '~' + data["geoplugin_latitude"]
                    + '~' + data["geoplugin_longitude"] + '~' + data["geoplugin_region"]

        $("#hdnID").val(_req);
    });

    $("#btnRefreshCaptcha").click(function () {
        FillrefreshcaptchaImage();
    });

    try {
        $("input[type='text']").each(function () {
            $(this).attr("autocomplete", "off");
        });
    }
    catch (e)
    { }


});


function FillCaptcha() {
    $.ajax({

        url: '../Common/GenerateCaptchaCode',

        datatype: "json",
        type: 'POST',
        async: false,
        data: {},
        success: function (response) {
            $(".captchatext").text(response);
            $(".captcha").val('');
        }
    });
}

function FillrefreshcaptchaImage() {
    $(".captcha").val('');
    $('#imgPhoto').attr('src', '../img/whitey.jpg').width(250).height(50);
    $.ajax({
        type: "POST",
        url: '../Account/showrefreshcaptchaImage',
        data: {},
        datatype: "json",
        responseType: "blob",
        success: function (response) {

            var arr = new Uint8Array(response);
            var blob = new Blob([arr.buffer]);
            if (blob.size == 0) {
                $('#imgPhoto').attr('src', '../img/whitey.jpg').width(250).height(50);
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgPhoto').attr('src', e.target.result).width(250).height(50);
            };
            reader.readAsDataURL(blob);

        }
    });
}

function FillimageCaptcha() {

    $(".captcha").val('');
    $('#imgPhoto').attr('src', '../img/whitey.jpg').width(250).height(50);

    $.ajax({
        type: "POST",
        url: '../Account/showcaptchaImage',
        data: {},
        datatype: "json",
        responseType: "blob",
        success: function (response) {

            var arr = new Uint8Array(response);
            var blob = new Blob([arr.buffer]);
            if (blob.size == 0) {
                $('#imgPhoto').attr('src', '../img/whitey.jpg').width(250).height(50);
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgPhoto').attr('src', e.target.result).width(250).height(50);
                
            };
            reader.readAsDataURL(blob);
        }
    });
}