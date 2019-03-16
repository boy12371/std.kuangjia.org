//var APIURL = "http://apitest9.bobol.com/";
var APIURL = "http://localhost:53368/";

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


//填充首页的新闻文章
function FillFrontpagesNews() {
	//alert("eeee");
	//获取头条文章列表
    $.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?Tag=3", function (data, status) {
		var articals = data.ResponseObject;
		
		var count = 0;
        $.each(data.ResponseObject, function(i, item) {
			//alert(item.Title)
            $("#news_id_title_" + i).html(item.Title); 
			$("#news_id_content_" + i).html(item.Desc); 
			
			var articalId = item.ID;
			
			$("#news_id_title_" + i).on( "click", function() {
				window.location.href = "./sevice-detail.html?articalID=" + articalId;
			    console.log( articalId);
			});
			count += 1;
			if(count >=3) {
				return;
			}
        });
        //$("#txtPrepareToken").val(data.ResponseObject);
        //alert("Data: " + data.ResponseObject + "\nStatus: " + status);
        //prepareToken = data.ResponseObject;
    });
}

//填充首页的新闻文章
function FillFrontpagesEvents() {
	//alert("eeee");
	//获取头条文章列表
    $.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?Tag=5", function (data, status) {
		var articals = data.ResponseObject;
		
		var count = 0;
        $.each(data.ResponseObject, function(i, item) {
			//alert(item.Title)
            $("#events_id_title_" + i).html(item.Title); 
			$("#events_id_content_" + i).html(item.Desc); 
			
			var articalId = item.ID;
			
			$("#events_id_title_" + i).on( "click", function() {
				window.location.href = "./sevice-detail.html?articalID=" + articalId;
			    console.log( articalId);
			});
			count += 1;
			if(count >=3) {
				return;
			}
        });
        //$("#txtPrepareToken").val(data.ResponseObject);
        //alert("Data: " + data.ResponseObject + "\nStatus: " + status);
        //prepareToken = data.ResponseObject;
    });
}

//填充Notice
function FillFrontpagesNoticeBoard() {
	//alert("eeee");
	//获取头条文章列表
    $.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?Tag=4", function (data, status) {
		var articals = data.ResponseObject;
		
		var count = 0;
        $.each(data.ResponseObject, function(i, item) {
			//alert(item.Title)
            $("#noticeboard_id_title_" + i).html(item.Title); 
			$("#noticeboard_id_content_" + i).html(item.Desc); 
			
			var articalId = item.ID;
			
			$("#noticeboard_id_title_" + i).on( "click", function() {
				window.location.href = "./sevice-detail.html?articalID=" + articalId;
			    console.log( articalId);
			});
			count += 1;
			if(count >=3) {
				return;
			}
        });
        //$("#txtPrepareToken").val(data.ResponseObject);
        //alert("Data: " + data.ResponseObject + "\nStatus: " + status);
        //prepareToken = data.ResponseObject;
    });
}


//填充首页的四篇文章
function FillFrontpages() {
	//获取头条文章列表
    $.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?Tag=1", function (data, status) {
		var articals = data.ResponseObject;
		
        $.each(data.ResponseObject, function(i, item) {
			//alert(item.Title)
            $("#articalTitle" + i).html(item.Title); 
			$("#articalDesc" + i).html(item.Desc); 
			
			var articalId = item.ID;
			
			$("#articalLinke" + i).on( "click", function() {
				window.location.href = "./sevice-detail.html?articalID=" + articalId;
			    console.log( articalId);
			});
        });
        //$("#txtPrepareToken").val(data.ResponseObject);
        //alert("Data: " + data.ResponseObject + "\nStatus: " + status);
        //prepareToken = data.ResponseObject;
    });
}

//获得文章的分类列表
function FillLeftMenuForSevice(defaultTag) {

	var dTagId = '1';
	var dTagTitle = "";
	if(defaultTag != undefined) {
		dTagId = defaultTag;
	}
    $.get(APIURL + "API/BBSTag/BBSTageForWeb", function (data, status) {
		var tags = data.ResponseObject;
		var tagHtml = "";
		var tagId = 1;
		
        $.each(data.ResponseObject, function(i, item) {
			//alert(item.Title)
			if(item.Id == dTagId) {
				dTagTitle = item.Tag;
				tagId = item.Id;
				tagHtml += '<div><a href="info.html?TagId=' + item.Id + '"  class="r full apps-btn active">';
			} else {
				tagHtml += '<div><a href="info.html?TagId=' + item.Id + '"  class="r full apps-btn">';
			}
			
			tagHtml = tagHtml + item.Tag;
			tagHtml = tagHtml +  "</a></div>";

        });
        $("#serviceTags").html(tagHtml);
		FillTagArticals(tagId, dTagTitle);
    });
}

var tagArticals;
var totalPagesNumber = 1;


//针对新网站，填充首页的内容
function FillTagArticalsForFrontPage() 
{		
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=8&Tag=1", function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 0;
		var innerHtml1 = "";
		
		$.each(data.ResponseObject, function(i, item) {
			totalArticals += 1;
			
			if(totalArticals <= 8) {
				innerHtml1 = innerHtml1 + "<li><a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a></li>";
			}
		});
		
		$("#frontarticals_1").html(innerHtml1);
		//alert($(xId).html());
	});
	
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=8&Tag=2", function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 0;
		var innerHtml1 = "";
		
		$.each(data.ResponseObject, function(i, item) {
			totalArticals += 1;
			
			if(totalArticals <= 5) {
				innerHtml1 = innerHtml1 + "<li><a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a></li>";
			}
		});
		
		$("#frontarticals_2").html(innerHtml1);
	});
	
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=8&Tag=3", function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 0;
		var innerHtml1 = "";
		
		$.each(data.ResponseObject, function(i, item) {
			totalArticals += 1;
			
			if(totalArticals <= 5) {
				innerHtml1 = innerHtml1 + "<li><a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a></li>";
			}
		});
		
		$("#frontarticals_3").html(innerHtml1);
	});
	
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=8&Tag=4", function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 0;
		var innerHtml1 = "";
		
		$.each(data.ResponseObject, function(i, item) {
			totalArticals += 1;
			
			if(totalArticals <= 5) {
				innerHtml1 = innerHtml1 + "<li><a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a></li>";
			}
		});
		
		$("#frontarticals_4").html(innerHtml1);
	});
	
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=8&Tag=5", function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 0;
		var innerHtml1 = "";
		
		$.each(data.ResponseObject, function(i, item) {
			totalArticals += 1;
			
			if(totalArticals <= 5) {
				innerHtml1 = innerHtml1 + "<li><a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a></li>";
			}
		});
		
		$("#frontarticals_5").html(innerHtml1);
	});

}

//根据文章的分类获取并且填充文章的标题列表
function FillTagArticals(TagId, TagTitle) {
	
	$("#tagTitle").html(TagTitle);
	
	$.get(APIURL + "API/ProfessionalGeneratedContent/GetExpertArticlesForWeb?LastID=0&PageSize=200&Tag=" + TagId, function (data, status) {
		
		tagArticals = data.ResponseObject;
		var totalArticals = 1;
        $.each(data.ResponseObject, function(i, item) {
			
			
			if(totalArticals < 6) {
				$("#serviceTitle" + totalArticals).html(item.Title); 
				$("#serviceDesc" + totalArticals).html(item.Desc); 
				$("#titalViews" + totalArticals).html(item.Read); 
				
				var articalId = item.ID;
				
				$("#serviceTitle" + totalArticals).on( "click", function() {
					//alert(articalId);
					window.location.href = "./sevice-detail.html?articalID=" + articalId;
					console.log(articalId);
				});
				$("#serviceDesc" + totalArticals).on( "click", function() {
					window.location.href = "./sevice-detail.html?articalID=" + articalId;
					console.log(articalId);
				});
			}
			
			totalArticals += 1;
        });
		
		totalPagesNumber = parseInt((totalArticals + 5)/6);
		
		$('#pagination-demo').twbsPagination({
			totalPages: totalPagesNumber,
			first:'<<',
			prev:'<',
			next:'>',
			last:'>>',
			visiblePages: 10,
			onPageClick: function (event, page) {
				$('.text').hide();
				$('.line_3').hide();
				
				$.each(tagArticals, function(i, item) {
					
					var totalIndex = page * 6 - 5;
					var cIndex = i - totalIndex + 1;
					
					if(cIndex <= 6 && cIndex > 0) {
						$("#serviceTitle" + cIndex).html("<a href='./sevice-detail.html?articalID=" + item.ID + "'>" + item.Title + "</a>"); 
						$("#serviceDesc" + cIndex).html(item.Desc); 
						$("#titalViews" + cIndex).html('<a href="./sevice-detail.html?articalID=' + item.ID + '" class="views">' + item.Read + '</a>'); 
						$("#service" + cIndex).show();
						$("#service_line" + cIndex).show();
					}
				});
			}
		}); 
        //$("#txtPrepareToken").val(data.ResponseObject);
        //alert("Data: " + data.ResponseObject + "\nStatus: " + status);
        //prepareToken = data.ResponseObject;
    });
}


//显示文章详情页面的方法
function ShowArticalDetail() {
	//alert("xxxxx");
	var a_id = getUrlParameter('articalID');
	
	$.ajax({
		url: APIURL + "API/ProfessionalGeneratedContent/GetDetailForWeb?ID=" + a_id,
		type: 'GET',
		success: function(data){ 
			var res = data.ResponseObject;
			var articalTitle = res.Title;
			
			/*var x = articalDetail.indexOf("</p>");
			var afterArtical = "";
			if(x > 10)
			{
				afterArtical = articalDetail.substr(0,x + 4);
			} */

			$("#articalTitle").html(articalTitle);
			$("#articalDetail").html(res.Content);
			$("#readNumber").html(res.Read);
			$("#authorID").html(res.TipsterName + " &nbsp;&nbsp;&nbsp;发表于 " + FormatTimeStamp(res.CreateTimeStamp));
		},
		error: function(data) {
			//window.location.href = './index.html';
			//alert('woops!'); //or whatever
		}
	});
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

function ArticalTag(ID, Title)
{
	this.ID=ID;
	this.Title=Title;
}

function FormatTimeStamp(timeStamp) 
{
		// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(timeStamp * 1000);

	var years = date.getFullYear();
	var month = date.getMonth() + 1;
	var days = date.getDate();;

	// Will display time in 10:30:23 format
	var formattedTime = years + '年' + month + '月' + days + "日"
	
	return formattedTime
}