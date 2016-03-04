function gid(name) {
	return document.getElementById(name);
}

function showMeta() {
	if (gid('metadata').style.display == 'block') {
		gid('metadata').style.display = 'none';
	}
	else {
		gid('metadata').style.display = 'block';
	}
}

function show(id) {
var viewer = window.location.search;
if (viewer.indexOf('printable=yes') > 0) {
	document.getElementById('screen').media = 'none';
	document.getElementById('print').media = 'all';
	window.print();
}
var d = document.getElementById(id);
	for (var i = 0; i<=20; i++) {
		if (document.getElementById('smenu'+i)) {
			if (document.getElementById('smenu'+i).style.display!='block')
			document.getElementById('smenu'+i).style.display='none';
		}
	}
if (d) {d.style.display='block';}
}

function showHide(element_id) {
	if (document.getElementById && document.getElementById(element_id) && document.getElementById(element_id).style) {
		var menu  = document.getElementById(element_id);
		var arrow = document.getElementById(element_id + '_arrow');
		var title = document.getElementById(element_id + '_title');
		if (menu.style.display == "block") {
			menu.style.display = "none";
			if (arrow.src) { arrow.src = arrow.src.replace("down","right"); }
			//document.getElementById('darkerHeader').id = document.getElementById('darkerHeader').id.replace("lighter","darker");
		}
		else {
			menu.style.display = "block";
			if (arrow.src) { arrow.src = arrow.src.replace("right","down"); }
			//document.getElementById('darkerHeader').id = document.getElementById('darkerHeader').id.replace("darker","lighter");
		}
	}
}

function changeHeight(new_height) {
	document.getElementById('banner').style.height = new_height + 'px';
}

function searchSwitch(element_id, element2_id, first, second) {
	document.getElementById(element_id).style.display='block';
	document.getElementById(first).style.display='block';
	document.getElementById(second).style.display='none';
	document.getElementById(element2_id).style.display='none';
}

// for adding a reply to a bookmark page comment
function add_reply(c_id, b_id, r_id) {
	if(!r_id) {
		var r_id = c_id;
	}
	if (document.getElementById('comments-reply' + c_id).innerHTML == "") {
		document.getElementById('comments-reply' + c_id).innerHTML = "<form action=\"article.php?b_id=" + b_id + "#comment" + c_id + "\" id=\"comments-post-new-form\" method=\"post\"><textarea name=\"comments-post-textarea\" id=\"comments-post-textarea\" class=\"comments-post-textarea\"></textarea><br /><input type=\"hidden\" id=\"c_id\" name=\"c_id\" value=\"" + r_id + "\"/><input type=\"submit\" class=\"comment-submit\" name=\"comment-submit\" id=\"comment-submit\" value=\"Add reply\" /></form>";
	}
	else {
		document.getElementById('comments-reply' + c_id).innerHTML = "";
	}
}


function getHTTPObject(){
	if (window.ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest) return new XMLHttpRequest();
	else {
		alert("Your browser does not support AJAX.");
		return null;
	}
} 

function add_vote(id, type, div_id, after_id, votes, approval_value)
{
  var xmlHttp = getHTTPObject();
 
  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
		if (approval_value == 1) {
			add_ajax_votes(div_id, votes);
			if ((type == 1)||(type == 3)) {
				document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/approve-done.png\" class=\"approve\" alt=\"I've already voted\" />";
			}
			else if ((type == 2)||(type == 4)) {
				document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/approve-small-done.png\" class=\"approve\" alt=\"I've already voted\" />";
			}
		}
		else if (approval_value == -1) {
			if ((type % 2) > 0) {
				if (votes == 0) {
					document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/disapprove-marked.png\" class=\"disapprove\" alt=\"I've already reported\" />";
				}
				else if (votes == 1) {
					document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/disapprove-clear.png\" class=\"disapprove\" alt=\"I've already reported\" />";
				}
			}
			else if ((type % 2) == 0) {
				if (votes == 0) {
					document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/disapprove-small-marked.png\" class=\"disapprove\" alt=\"I've already reported\" />";
				}
				else if (votes == 1) {
					document.getElementById(after_id).innerHTML = "<img src=\"" + window.location.protocol + "//" + window.location.host + "/styles/images/disapprove-small-clear.png\" class=\"disapprove\" alt=\"I've already reported\" />";
				}
			}
		}
    }
  }

  xmlHttp.open("SEND", window.location.protocol + "//" + window.location.host + "/add_votes.php?id=" + id + "&type=" + type + "&approval_value=" + approval_value, true);
  xmlHttp.send(null);
}

function add_ajax_votes(div_id, votes) {
	document.getElementById(div_id).innerHTML = votes + 1;
}

function enableField(language)
{
	if ((language == 1)&&(document.video_upload.title.disabled==false)) {
		document.video_upload.title.disabled=true;
		document.video_upload.video.disabled=true;
		document.video_upload.description.disabled=true;
		document.video_upload.transcript.disabled=true;
		document.video_upload.caption.disabled=true;
		document.video_upload.audio_description.disabled=true;
		document.video_upload.preview.disabled=true;
	}
	else if ((language == 1)&&(document.video_upload.title.disabled==true)) {
		document.video_upload.title.disabled=false;
		document.video_upload.video.disabled=false;
		document.video_upload.description.disabled=false;
		document.video_upload.transcript.disabled=false;
		document.video_upload.caption.disabled=false;
		document.video_upload.audio_description.disabled=false;
		document.video_upload.preview.disabled=false;
	}
	else if ((language == 2)&&(document.video_upload.title_fr.disabled==false)) {
		document.video_upload.title_fr.disabled=true;
		document.video_upload.video_fr.disabled=true;
		document.video_upload.description_fr.disabled=true;
		document.video_upload.transcript_fr.disabled=true;
		document.video_upload.caption_fr.disabled=true;
		document.video_upload.audio_description_fr.disabled=true;
		document.video_upload.preview_fr.disabled=true;
	}
	else if ((language == 2)&&(document.video_upload.title_fr.disabled==true)) {
		document.video_upload.title_fr.disabled=false;
		document.video_upload.video_fr.disabled=false;
		document.video_upload.description_fr.disabled=false;
		document.video_upload.transcript_fr.disabled=false;
		document.video_upload.caption_fr.disabled=false;
		document.video_upload.audio_description_fr.disabled=false;
		document.video_upload.preview_fr.disabled=false;
	}
}  

function enableAudio(language)
{
	if ((language == 1)&&(document.audio_upload.title.disabled==false)) {
		document.audio_upload.title.disabled=true;
		document.audio_upload.audio.disabled=true;
		document.audio_upload.description.disabled=true;
		document.audio_upload.transcript.disabled=true;
	}
	else if ((language == 1)&&(document.audio_upload.title.disabled==true)) {
		document.audio_upload.title.disabled=false;
		document.audio_upload.audio.disabled=false;
		document.audio_upload.description.disabled=false;
		document.audio_upload.transcript.disabled=false;
	}
	else if ((language == 2)&&(document.audio_upload.title_fr.disabled==false)) {
		document.audio_upload.title_fr.disabled=true;
		document.audio_upload.audio_fr.disabled=true;
		document.audio_upload.description_fr.disabled=true;
		document.audio_upload.transcript_fr.disabled=true;
	}
	else if ((language == 2)&&(document.audio_upload.title_fr.disabled==true)) {
		document.audio_upload.title_fr.disabled=false;
		document.audio_upload.audio_fr.disabled=false;
		document.audio_upload.description_fr.disabled=false;
		document.audio_upload.transcript_fr.disabled=false;
	}
}

function enableAlbum(language)
{
	if (((language == 1)||(language == 3))&&(document.create_album.title.disabled==false)) {
		document.create_album.english.checked=false;
		document.create_album.title.disabled=true;
		document.create_album.description.disabled=true;
	}
	else if (((language == 1)||(language == 3))&&(document.create_album.title.disabled==true)) {
		document.create_album.english.checked=true;
		document.create_album.title.disabled=false;
		document.create_album.description.disabled=false;
	}
	else if (((language == 2)||(language == 3))&&(document.create_album.title_fr.disabled==false)) {
		document.create_album.french.checked=false;
		document.create_album.title_fr.disabled=true;
		document.create_album.description_fr.disabled=true;
	}
	else if (((language == 2)||(language == 3))&&(document.create_album.title_fr.disabled==true)) {
		document.create_album.french.checked=true;
		document.create_album.title_fr.disabled=false;
		document.create_album.description_fr.disabled=false;
	}
}

function enablePodcast(language)
{
	if ((language == 1)&&(document.podcast_upload.title.disabled==false)) {
		document.podcast_upload.title.disabled=true;
		document.podcast_upload.description.disabled=true;
		document.podcast_upload.keywords.disabled=true;
		document.podcast_upload.image_en.disabled=true;
		document.podcast_upload.subtitle.disabled=true;
		document.podcast_upload.author.disabled=true;
		document.podcast_upload.owner.disabled=true;
		document.podcast_upload.copyright.disabled=true;
	}
	else if ((language == 1)&&(document.podcast_upload.title.disabled==true)) {
		document.podcast_upload.title.disabled=false;
		document.podcast_upload.description.disabled=false;
		document.podcast_upload.keywords.disabled=false;
		document.podcast_upload.image_en.disabled=false;
		document.podcast_upload.subtitle.disabled=false;
		document.podcast_upload.author.disabled=false;
		document.podcast_upload.owner.disabled=false;
		document.podcast_upload.copyright.disabled=false;
	}
	else if ((language == 2)&&(document.podcast_upload.title_fr.disabled==false)) {
		document.podcast_upload.title_fr.disabled=true;
		document.podcast_upload.description_fr.disabled=true;
		document.podcast_upload.keywords_fr.disabled=true;
		document.podcast_upload.image_fr.disabled=true;
		document.podcast_upload.subtitle_fr.disabled=true;
		document.podcast_upload.author_fr.disabled=true;
		document.podcast_upload.owner_fr.disabled=true;
		document.podcast_upload.copyright_fr.disabled=true;
	}
	else if ((language == 2)&&(document.podcast_upload.title_fr.disabled==true)) {
		document.podcast_upload.title_fr.disabled=false;
		document.podcast_upload.description_fr.disabled=false;
		document.podcast_upload.keywords_fr.disabled=false;
		document.podcast_upload.image_fr.disabled=false;
		document.podcast_upload.subtitle_fr.disabled=false;
		document.podcast_upload.author_fr.disabled=false;
		document.podcast_upload.owner_fr.disabled=false;
		document.podcast_upload.copyright_fr.disabled=false;
	}
}

function openclose(id){
	if (document.getElementById){
		obj = document.getElementById(id);
		if (obj.style.display == "none"){
			obj.style.display = "";
		} else {
			obj.style.display = "none";
		}
	}
} 

function copyToClipboard(field)
{
    var content = eval("document."+field)
    content.focus()
    content.select()
    range = content.createTextRange()
    range.execCommand("Copy")
    window.status="Contents copied to clipboard"
    setTimeout("window.status=''",1800)
}

function showLightbox(contentDiv,overlay){

	if (window.innerHeight) //if browser supports window.innerHeight
	{
		var innerh = document.getElementById("wrapper").offsetHeight + 33;
		var posy = window.pageYOffset;
		var visibleHeight = window.innerHeight;
	}
	
	else if (document.all) //else if browser supports document.all (IE 4+)
	{
		var innerh = (document.body.clientHeight);
		var posy = document.documentElement.scrollTop;
		var visibleHeight = document.documentElement.clientHeight;
	}
	
	document.getElementById(contentDiv).style.display='inline-block';
	document.getElementById(contentDiv).style.width = document.body.offsetWidth + 124 + "px";
	document.getElementById(overlay).style.height = innerh+"px";
	document.getElementById(overlay).style.width = document.body.offsetWidth + 124 + "px";
	document.getElementById(overlay).style.display='block';
	document.getElementById(contentDiv).style.top = posy + ((visibleHeight - document.getElementById(contentDiv).clientHeight)/2)+"px";
	
	document.onkeydown = keyDownListener;
	
	/*
	if(document.getElementById("mdsvideo") != null){
		document.getElementById("mdsvideo").onkeydown = keyDownListener;
	}
	*/
	document.getElementById(overlay).onclick = onclickListener;
	document.getElementById(contentDiv).onclick = onclickListener;
	window.onresize = onresizeListener;

	function keyDownListener(e){
		var escKey  = (window.event) ? event.keyCode : e.keyCode;
		if(escKey==27||escKey==88){
			
			hideLightbox(contentDiv,overlay);
			
		}
	}
	
	function onclickListener(e) {
		//hideLightbox(contentDiv,overlay);
	}
	
	function onresizeListener(e){
		
		showLightbox(contentDiv,overlay);
		
	}
}

function hideLightbox(contentDiv,overlay){
	window.onresize = null;
	document.onkeydown = null;
	document.getElementById(contentDiv).style.display='none';
	document.getElementById(overlay).style.display='none';
	
	document.getElementById(overlay).onclick = null;
	document.getElementById(contentDiv).onclick = null;
}