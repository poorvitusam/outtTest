$(document).ready(function(){
	var $page = $(".js-page");
	//Call for dynamically loading home page
	
    $.ajax({
        type: "GET",
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: "",
        dataType: "json",
        success: function (data) {
            
	        var innerHTML = '';
	        $.each(data, function(i, item) {
			    innerHTML += '<div class="post js-post" data-id="' + data[i].id + '"> <div class="post_title js-title">' + data[i].title + '</div><div class="post_close js-close">&times;</div><div class="post_content js-body">' + data[i].body + '</div></div>';
			});
        
        	$page.find(".js-home-page").append(innerHTML);

        	
        	$page.find(".js-page-container").find(".js-slides").find(".js-slide").each(function(i,ele) {

				var $this = $(ele);
				// if($this.find(".js-title").text()=="") {
					
					var entry = data[Math.floor(Math.random()*data.length)];
					$this.find(".js-title").text(entry.title);

					var url = 'https://jsonplaceholder.typicode.com/users/' + entry.userId;
				    $.ajax({
				        type: "GET",
				        url: url,
				        data: "",
				        dataType: "json",
				        success: function (user_data) {
				        	$this.find(".js-author").text(user_data.name);
				        },
				        error: function (msg) {
				            alert(entry.id);
				        }
				    });
				 // }
			});
        	$page.find('.preloader').fadeOut('slow',function(){$(this).remove();});
			
        },
        error: function () {
            $page.html('<div class="f-40 p-100 ta">Something went wrong.Please try again later</div>');
        }
    });


    $page.find('.js-home-page').on('click','.js-close',function(event){
    	event.stopPropagation();

	    $(this).closest(".js-post").remove();
	});

    (function poll() {
	   setTimeout(function() {
	       $.ajax({ url: 'https://jsonplaceholder.typicode.com/posts', success: function(data) {
	            var innerHTML = '';
		        $.each(data, function(i, item) {
				    innerHTML += '<div class="post js-post" data-id="' + data[i].id + '"> <div class="post_title js-title">' + data[i].title + '</div><div class="post_close js-close">&times;</div><div class="post_content js-body">' + data[i].body + '</div></div>';
				});
	        
	        	$page.find(".js-home-page").append(innerHTML);
	       }, dataType: "json", complete: poll });
	    }, 30000);
	})();


    $page.find('.js-home-page').on('click','.js-post',function(){
	    var id = $(this).attr("data-id");
	    var title = $(this).find(".js-title").text();
	    var body = $(this).find(".js-body").text();

		var url = 'https://jsonplaceholder.typicode.com/users/' + id;
	    $.ajax({
	        type: "GET",
	        url: url,
	        data: "",
	        dataType: "json",
	        success: function (data) {
	        	var innerHTML = '<div class="postExpanded js-postExpanded" data-id="' + id + '"><div class="postExpanded_title">' + title +'</div><div class="postexpanded_userDetails"> <div class="postExpanded_name">' +data.name + '</div><div class="postExpanded_city">' + data.address.city + '</div> </div><div class="clr"></div><div class="postExpanded_content">' + body + '</div><div class="btn-postExpanded_displayToggle js-btn-commentsToggle">Show Comments</div><div class="clr"></div><div class="js-commentsBlock hide"></div><div class="clr"></div></div>'
	        	$page.find(".js-page-container").find(".js-home-page").html(innerHTML);
	        
	        },
	        error: function () {
	        	$page.html('<div class="f-40 p-100 ta">Something went wrong.Please try again later</div>');
	        }
	    });
	});

	$page.find(".js-nav-main").on('click', '.js-options', function() {
		//Handle nav bar
		$page.find(".js-nav-main").find(".js-options").removeClass("selected");
		$(this).addClass("selected");

		var option_num = $(this).attr("data-navOptions");//Store the page to be viewed

		//Handle the body as per the nav bar
		$page.find(".js-page-container").children().addClass("hide");
		$page.find(".js-page-container").children().each(function() {
			$item = $(this);
			if($item.attr("data-content") == option_num) {
				$item.removeClass("hide");
			}
		});
	});

	$page.find('.js-page-container').find('.js-home-page').on('click', '.js-btn-commentsToggle', function () {
		var id = $(this).closest(".js-postExpanded").attr("data-id");
		var url = 'https://jsonplaceholder.typicode.com/comments?postId='+id;
		$.ajax({
	        type: "GET",
	        url: url,
	        data: "",
	        dataType: "json",
	        success: function (data) {
	        	var innerHTML = "";
	        	$.each(data, function(i, item) {
			    	innerHTML += '<div class="postExpanded_commentsBlock "><div class="postExpanded_commentsBlock_name">' + data[i].name + ': </div><div class="postExpanded_commentsBlock_body">' + data[i].body +'</div></div>';
				});

	        	$page.find(".js-page-container").find(".js-home-page").find(".js-commentsBlock").html(innerHTML);
	        
	        },
	        error: function () {
	        	$page.html('<div class="f-40 p-100 ta">Something went wrong.Please try again later</div>');
	        }
	    });
		$(this).text(function(i, text){
			return text === "Show Comments" ? "Hide Comments" : "Show Comments";
		})
		$page.find(".js-postExpanded").find(".js-commentsBlock").slideToggle();	
	})

	
	$page.find(".owl-carousel").owlCarousel({
		autoplay:true,
		autoplayTimeout:500,
		autoplayHoverPause:true,
		center: true,
	    items:1,
	    loop:true,
	    margin:10,
	    0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
	});
})


