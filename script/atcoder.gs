function takeScreenshot(url, filename, folder_id) {
  const WIDTH         = 800;
  const HEIGHT        = 600;
  const CAPTURING_URL = 
      API_WORDPRESS 
    + url
    + '?w=' + WIDTH
    + '&h=' + HEIGHT
    + '&delay=' + '10000'
  ;
  
  Utilities.sleep(10000);
  const RESPONSE_DATA = UrlFetchApp.fetch( CAPTURING_URL );
  const RESPONSE_BLOB = RESPONSE_DATA.getBlob();
  
  RESPONSE_BLOB.setName(filename);
  const folder = DriveApp.getFolderById(folder_id);
  folder.createFile(RESPONSE_BLOB);
  // DriveApp.createFile(RESPONSE_BLOB);
}

function captureScreendot(url, filename, folder_id) {
  var headers = {
    'Accept' : 'application/json;',
    'Authorization': 'Bearer ' + TOKEN_SCREENDOT,
  };

  var options = {
    'method' : 'get',
    'headers' : headers,
  };

  const CAPTURING_URL = 'https://screendot.io/api/standard?url=' + url;
    // + '&delay=1000'
    // + '&format=png'
    // + '&fullPage=true'
  // ;
    // + '&browserWidth=800'
    // + '&browserHeight=600'
  // ;
  const RESPONSE_DATA = UrlFetchApp.fetch(CAPTURING_URL, options);
  const RESPONSE_BLOB = RESPONSE_DATA.getBlob();
  RESPONSE_BLOB.setName(filename);

  const folder = DriveApp.getFolderById(folder_id);
  folder.createFile(RESPONSE_BLOB);
}

function getURLFromExplain(contest_name, problem_name) {
  
  var url = `https://atcoder.jp/contests/${contest_name}/editorial?lang=ja`;
  var response = UrlFetchApp.fetch(url);
  var text = response.getContentText('utf-8');
  var topic_block = Parser.data(text).from(`href="/contests/${contest_name}/tasks/${problem_name}"`).to('>by</span>').build();
  var url = Parser.data(topic_block).from('<a href="').to('"').build();

  return 'https://atcoder.jp' + url + '?lang=ja';
}

function testScreenshot() {
  // captureScreenshot('https://www.google.com', 'a.png', FOLDER_ID);
  // captureScreenshot('https://screendot.io', 'a.png', FOLDER_ID);
}