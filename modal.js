
var modal = document.createElement('div');
modal.className = 'modal';

var videoContainer = document.createElement('div');
videoContainer.className = "aaa";
modal.appendChild(videoContainer);

modal.style.display = 'none';

document.body.appendChild(modal);

// YouTubeのプレーヤーを格納する変数
var player;

// YouTubeのプレーヤーを初期化する関数
function onYouTubeIframeAPIReady() {
    player = new YT.Player('aaa', {
        height: '360',
        width: '640',
        playerVars: {
            'autoplay': 0, // 自動再生を無効にする
            'controls': 1, // コントロールボタンを表示する
            'disablekb': 0, // キーボード操作を無効にする
            'enablejsapi': 1, // JavaScript APIを有効にする
            'fs': 0, // フルスクリーンボタンを非表示にする
            'iv_load_policy': 3, // 動画アノテーションを非表示にする
            'modestbranding': 1, // YouTubeロゴを非表示にする
            'playsinline': 1, // インライン再生を有効にする（iOS）
            'rel': 0, // 関連動画を表示しない
            'showinfo': 0 // 動画情報を非表示にする
        },
    });
}

// 時間を秒数に変換する関数
function convertTimeToSeconds(timeString) {
    // コロンで時間と分を分割
    var timeArray = timeString.split(':');
    // 時間と分を取得
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);
    // 時間を秒数に変換して返す
    var totalSeconds = 0;
    var digit = 1;
    timeArray.reverse().forEach(function(factor) {
        totalSeconds += factor * digit;
        digit *= 60;
    });

    return totalSeconds;
}


// YouTubeの動画を再生する関数
function playYouTubeVideo(startTime, videoId) {
    player.loadVideoById({
        videoId: videoId,
        startSeconds: startTime
    });
}



// aタグを取得
var ytTimeLinks = document.querySelectorAll('a.yt-core-attributed-string__link');


// ホバー時の処理を定義
ytTimeLinks.forEach(function(link) {
    timeString = link.innerText;
    startSeconds = convertTimeToSeconds(timeString);

    link.addEventListener('mouseenter', function() {
        console.log("hoveron");
        modal.style.display = 'block';
        playYouTubeVideo(startSeconds, 'G4MNZxzfdRw');
    });
    
    // aタグからホバーが外れたときの処理を定義
    link.addEventListener('mouseleave', function() {
        console.log("hoverleave");
        player.pauseVideo();
        modal.style.display = 'none';
    });

});
