/* 
 * @ Author -Serge Bayol serge@webin33.com
 * 
 * select the video server path
 * put the video tag in the page
 * 
 */

	// var video_path = 'conference/congres_reseau_cs' ; // On indique ici le nom du fchier à jouer et son dossier d'appartenance
        //var video_path = 'conference/small' ;
        var get_video_path = video_path;
        var video_balise = '<video id="video" controls="controls" preload="none"></video>';
	var defaut = 'rtmp://streaming1.city-zen.info:1935/vod/';
	var backup = 'rtmp://afpa3.privilis.com/ffmpeg-test/';
	var streamer_FMS = 'rtmp://streaming1.city-zen.info:1936/vod/';
	var streamer_Red5 = 'rtmp://streaming1.city-zen.info:1935/vod/';
	var apache = 'http://streaming1.city-zen.info:8080/vod/';
        var new_video_path = apache+video_path;
        alert("new_video_path : "+new_video_path);
        var mp4_tag = '<source id="mp4" src="'+new_video_path+'.mp4" type="video/mp4">';
        var webm_tag = '<source id="webm" src="'+new_video_path+'.webm" type="video/webm">';
        var ogv_tag = '<source id="webm" src="'+new_video_path+'.ogv" type="video/ogg">';
        var no_html = '<p>Your user agent does not support the HTML5 Video element.</p>';
        sources_tag = video_balise+mp4_tag+webm_tag+ogv_tag+no_html;
        document.getElementById("video").innerHTML = sources_tag;
