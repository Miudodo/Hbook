define(["jquery","global","juicer","text!../../templates/topic-detail.htm","text!../../templates/topic-comment.htm","text!../../templates/comment-dialog.htm","tPage","login","mousewheel","tScroll","tForm"],function(a,e,t,s,i,n,r){var o=function(){var e,t=a("#topic-detail"),r=a("#comment-dialog"),o=a("#comment-list"),d=getQueryString("id"),c=function(a){return timeFormat((new Date).Format("yyyy-MM-dd hh:mm:ss"),a)};juicer.register("format",c),require(["baidueditor","zeroclipboard","bdlang"],function(c,l){function m(t,s){var n=10,r={limit:n,offset:(t-1)*n,themeId:d};getAjax("circleReply/getReplyList.html","get",r,function(r){o.html(juicer(i,r)),a("#page").tPaginator({current:t,pageCount:Math.ceil(r.data.total/n),callback:function(a){m(a)}}),s&&s();var c,l;a("#my-comment").unbind("click"),a("#my-comment").on("click","a",function(t){var s=a(this),i=s.data("action"),n=s.data("reviewid"),r=s.data("mainid"),o=s.data("name"),m=(s.attr("data-isopen"),s.attr("data-toggle")),p=s.parents(".first-around").find(".other-comment").length;if("reply"==i){var u="";l=s,l=s.parents(".first-around").find(".one-comment .reply-num"),"false"==m?(s.parents(".first-around").siblings().find(".textarea").remove(),s.parents(".first-around").find(".textarea").remove(),u='<div class="textarea reply-dialog"><script id="editor-comment" type="text/plain" ></script> <a href="javascript:;" class="s-topic-btn" data-action="sub" id="sub" ><i class="icon-24 icon-right"></i></a></div>',s.parents(".one-sumary").append(u),c=new baidu.editor.ui.Editor({toolbars:[["emotion",""]],autoClearinitialContent:!0,wordCount:!1,elementPathEnabled:!1,initialFrameHeight:70,emotionLocalization:!0,enableAutoSave:!1,contextMenu:[]}),c.render("editor-comment"),a("#sub").attr("data-parentId",n),a("#sub").attr("data-mainId",r),s.parents(".first-around").find(".reply").attr("data-toggle","false"),s.parents(".first-around").siblings().find(".reply").attr("data-toggle","false"),s.attr({"data-toggle":"true"}),n||a("#sub").removeAttr("data-parentId"),s.find(".arrow-icon").addClass("high"),s.parents(".other-comment").siblings(".one-comment").find(".arrow-icon").removeClass("high"),s.parents(".first-around").siblings().find(".arrow-icon").removeClass("high"),c.addListener("focus",function(e,t){a("#editor-comment").find(".edui-default.edui-editor").css({border:"2px solid #33CCCC"})}),c.addListener("blur",function(e,t){a("#editor-comment").find(".edui-default.edui-editor").css({border:"2px solid #ccc"})}),c.addListener("contentChange",function(e,t){var s=c.getContentLength();0==s?a("#sub").find("i").css({opacity:.1}):a("#sub").find("i").css({opacity:.5})}),c.ready(function(e){var t;clearTimeout(t),o?(c.setContent(" "),c.execCommand("inserthtml","@"+o+":")):c.setContent(""),c.focus(),a(window).scrollTop(s.parents(".first-around").find(".textarea").offset().top-300)}),s.parents(".around").find(".operation ").css({opacity:"0"}),s.parents(".first-around").siblings().find(".operation").css({opacity:"0"}),s.parents(".operation ").css({opacity:"1"})):(s.attr({"data-toggle":"false"}),s.parents(".around").find(".operation ").css({opacity:"0"}),s.find(".arrow-icon").removeClass("high"),s.parents(".first-around").find(".textarea").remove())}else if("sub"==i){if(!checkUser())return;var u="",f=c.getContent(),g=a("<div>"+f+"</div>");if(g.find('img:not(".icon-emotion")').length>0)return void showMessages("禁止发布图片");var h=s.attr("data-mainId"),v=s.attr("data-parentid");if(0==a.trim(f).length)return void showMessages("请输入内容");if(a.trim(f).length>2e3)return void showMessages("回复内容应在2000字符内");var y={themeId:d,content:f},y={themeId:d,content:f,mainReplyId:h,parentId:v};getAjax("circleReply/create.html","post",y,function(a){0!=p?(u='<div class="around"><div class="left-mark"><a href="circle/user.html?userId='+e.id+"&userName="+e.nickName+'"><img src="'+a.resUrl+"user/"+e.portraitSuffix+'" alt=""></a></div><div class="right-summary"><div class="right-summary-hover "><p class="msg"><a href="circle/user.html?userId='+e.id+"&userName="+e.nickName+'"><span class="name">'+e.nickName+'</span></a><span class="time">'+timeFormat((new Date).Format("yyyy-MM-dd hh:mm:ss"),(new Date).Format("yyyy-MM-dd hh:mm:ss"))+'</span></p><div class="right-summary-p">'+a.data.content+'</div><p class="operation msg"><a href="javascript:;" class="report" data-action="report" data-mainId="'+h+'" data-userid="'+e.id+'" ><span class="">举报 ▼</span></a><span class="span-1">|</span> <a href="javascript:;" class="reply" data-action="reply" data-mainId="'+h+'"  data-reviewid="'+a.data.id+'" data-isopen="true" data-name="'+e.nickName+'" data-toggle="false"><span class="comment">评论</span></a></p></div></div></div>',s.parents(".first-around").find(".other-comment .around-box").append(u)):(u='<div class="other-comment"><div class="around-box"><div class="around"><div class="left-mark"><a href="#"><img src="'+a.resUrl+"user/"+e.portraitSuffix+'" alt=""></a></div><div class="right-summary"><div class="right-summary-hover "><p class="msg"><span class="name">'+e.nickName+'</span><span class="time">'+timeFormat((new Date).Format("yyyy-MM-dd hh:mm:ss"),(new Date).Format("yyyy-MM-dd hh:mm:ss"))+'</span></p><div class="right-summary-p">'+a.data.content+'</div><p class="operation msg"><a href="javascript:;" class="report" data-action="report" data-mainId="'+h+'"  data-userid="'+e.id+'" ><span class="">举报 ▼</span></a><span class="span-1">|</span> <a href="javascript:;" class="reply" data-action="reply" data-mainId="'+h+'"  data-reviewid="'+a.data.id+'" data-isopen="true" data-name="'+e.nickName+'" data-toggle="false"><span class="comment">评论</span></a></p></div></div></div></div><div class="more-comment"><a href="javascript:;"  data-mainId="'+h+'"  data-page="0" data-action="more" data-counts="0" class="more" style="display:none;">更多回复 ∨ </a></div></div>',s.parents(".first-around").find(".one-sumary").append(u));var t=l.text();t++,l.text(t),s.parents(".one-sumary").find(".operation").css({opacity:"0"}),s.parents(".first-around").find(".reply").attr("data-isopen","false"),s.parents(".first-around").find(".textarea").remove()})}else if("goods"==i){if(!checkUser())return;var x={objId:r,objType:2,attitude:0};getAjax("common/declare.html","post",x,function(a){if("0000"==a.returnCode){var e=s.find(".goods-num").text();e++,s.find(".goods-num").text(e)}else"ATTITUDE-0001"==a.returnCode?showMessages("您已经对该回复点过赞了"):showMessages("请稍后再试")})}else if("more"==i){var b=5,u="",w=s.attr("data-page"),C=s.attr("data-counts"),I=s.parents(".other-comment").find(".around").length,M=w*b,j={mainReplyId:r,startIndex:M,pageSize:b};C>I?getAjax("circleReply/getReviewList.html","post",j,function(e){w++,s.attr("data-page",w);var e=e.data.list;a.each(e,function(a,e){u+='<div class="around"><div class="left-mark"><a href="#"><img src="circle/images/portrait/'+e.userLogo+'" alt=""></a></div><div class="right-summary"><div class="right-summary-hover "><p class="msg"><span class="name">'+e.nickname+'</span><span class="time">'+timeFormat((new Date).Format("yyyy-MM-dd hh:mm:ss"),e.createDate)+'</span></p><div class="right-summary-p">'+e.content+'</div><p class="operation msg"><a href="javascript:;" class="report" data-action="report" data-reviewid="'+e.id+'" data-userid="'+e.opUser+'" data-causetype="1"><span class="">举报 ▼</span></a><span class="span-1">|</span> <a href="javascript:;" class="reply" data-action="reply" data-reviewid="'+e.id+'"  data-mainId="'+e.mainReplyId+'" data-isopen="true" data-name="'+e.nickname+'" data-toggle="false"><span class="comment">评论</span></a></p></div></div></div>'}),s.parents(".first-around").find(".other-comment .around-box").append(u)}):s.text("已显示全部")}else if("report"==i){if(!checkUser())return;var k=dialog({title:"举报",okValue:"提交",width:400,cancelValue:"取消",autofocus:!1,content:'<div class="report-dialog"><div class="form-group"><select name="reportType" id="reportType"><option value="">请选择举报类型</option><option value="0">恶意广告</option><option value="1">内容违法</option><option value="2">内容淫秽</option></select><div class="form-alert"></div></div><div class="form-group"><textarea class="t-textarea" name="reportText" id="reportText" placeholder="其他举报信息"></textarea><div class="form-alert"></div></div></div>',onshow:function(){a("#reportType").tSelect()},ok:function(){if(a("#reportType").val())if(a("#reportText").val().trim().length>500)showMessages("举报信息应在500字符以内");else{var e=r;"1"==s.data("causetype")&&(e=s.data("reviewid")),getAjax("common/report.html","post",{causeType:s.data("causetype"),causeId:e,type:0,defId:s.data("userid"),causeType:s.data("causetype"),cause:a("#reportType").val(),statement:a("#reportText").val()},function(){showMessages("举报成功！"),k.close().remove()})}else showMessages("请选择举报类型",{skin:"t-error"});return!1},cancel:function(){}}).show()}})})}window.ZeroClipboard=l,getAjax("circle/getThemeDetail.html","get",{id:d},function(e){function i(){t.find(".msg-box").hover(function(){a(this).find(".my-circle-c").show()},function(){var e=a(this);e.find(".my-circle-c").hide()})}t.html(juicer(s,e)),console.log(e),i(),a("#detail-good").click(function(e){if(checkUser()){var t=a(this),s={objId:d,objType:1,attitude:0};getAjax("common/declare.html","post",s,function(a){if("0000"==a.returnCode){var e=t.find(".num").text();e++,t.find(".num").text(e)}else"ATTITUDE-0001"==a.returnCode?showMessages("您已经对该主题点过赞了"):showMessages("请稍后再试")})}})}),getAjax("circleReply/getReplyCount.html","get",{id:d},function(t){e=t.data.user,r.html(juicer(n,t));var s=new baidu.editor.ui.Editor({toolbars:[["emotion","simpleupload"]],autoClearinitialContent:!0,wordCount:!1,elementPathEnabled:!1,initialFrameHeight:70,emotionLocalization:!0,scaleEnabled:!1,enableAutoSave:!1,contextMenu:[]});s.render("editor"),s.ready(function(a){s.focus()}),s.addListener("focus",function(e,t){a("#editor").find(".edui-default.edui-editor").css({border:"2px solid #33CCCC"});var i=s.getContentLength();0==i?a("#sub-comment").find("i").css({opacity:.1}):a("#sub-comment").find("i").css({opacity:.5})}),s.addListener("blur",function(e,t){a("#editor").find(".edui-default.edui-editor").css({border:"2px solid #ccc"})}),s.addListener("contentChange",function(e,t){var i=s.getContentLength();0==i?a("#sub-comment").find("i").css({opacity:.1}):a("#sub-comment").find("i").css({opacity:.5})}),a("#sub-comment").click(function(t){if(checkUser()){var i=a(this),n=i.parent().prev().find("span i"),r=n.text(),o=s.getContent();if(console.log(o),0==a.trim(o).length)return void showMessages("请输入内容");if(a.trim(o).length>2e3)return void showMessages("回复内容应在2000字符内");var c="",l=a("<div>"+o+"</div>"),m=l.find('img:not(".icon-emotion")');if(m&&m.length>0){for(var p=0;p<m.length;p++)c=c+m.attr("tlink")+",";c=c.substring(0,c.length-1)}var u={themeId:d,content:o,overviewPhotos:c};getAjax("circleReply/create.html","post",u,function(t){var o='<div class="around first-around"><div class="left-mark"><a href="circle/user.html?userId='+e.id+"&userName="+e.nickName+'"><img src="'+t.resUrl+"user/"+e.portraitSuffix+'" alt=""/></a></div><div class="right-summary one-sumary"><div class="right-summary-hover one-comment"><p class="msg"><a href="circle/user.html?userId='+e.id+"&userName="+e.nickName+'"><span class="name">'+e.nickName+'</span></a><span class="time">'+timeFormat((new Date).Format("yyyy-MM-dd hh:mm:ss"),(new Date).Format("yyyy-MM-dd hh:mm:ss"))+'</span></p><div class="right-summary-p">'+t.data.content+'</div><p class="operation msg"><a href="javascript:;" class="report" data-userid="'+e.id+'" data-action="report" data-mainId="'+t.data.id+'" data-causetype="0"><span class="">举报 ▼</span></a><span class="span-1">|</span><a href="javascript:;" class="goods" data-action="goods" data-mainId="'+t.data.id+'"><span class="red"><i class="icon-16 icon-good"></i> <i class="goods-num">0</i></span></a><span class="span-1">|</span><a href="javascript:;" class="reply first-reply" data-action="reply"  data-mainId="'+t.data.id+'"  data-isopen="false" data-counts="0" data-toggle="false"><span class="comment"><i class="icon-16 icon-comment"></i> <i class="reply-num">0</i> ▼</span></a></p></div></div></div>';a("#my-comment").append(o),r++,n.text(r++),i.parent().prev().find("span i").text(),s.setContent(""),showMessages("回复成功")})}});var i=getQueryString("commentIndex");i?setTimeout(function(){m(Math.ceil(i/10),function(){var e=a("#comment_"+getQueryString("commentId"));e.length>0&&a(window).scrollTop(e.offset().top)})},200):m(1)})})};o()});