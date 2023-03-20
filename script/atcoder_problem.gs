
function getDifficulties(contest_name, problem_idf) {
  /*
      var contest_name = 'abc293';
      var problem_idf = ['a', 'b'];
  */

  // サンプルのjsonデータの格納URLを変数で定義する
  var json = readJson(API_ATCODER_PROBLEM);


  var datas = {};
  for (let idf of problem_idf) {
    var problem_name = `${contest_name}_${idf}`;
    var data = json[problem_name];
    datas[problem_name] = data['difficulty'];
  }
  
  return datas;
}

function readJson(url) {

  // URLにリクエストしてレスポンスとしてjsonデータを読み込む
  var response = UrlFetchApp.fetch(url).getContentText();

  // そのままではスクリプトで処理できないのでparseする
  var json = JSON.parse(response);

  return json;
}

function findJson(json, key) {
  return data = json.find((v) => v.id == key);
}

function getColorFromDifficulty(difficulty) {
  /*
    difficultyを色に変換する
  */ 

  var color = '';
  if (difficulty < 400) {
    color = '灰';
  } else if (difficulty < 800) {
    color = '茶';
  } else if (difficulty < 1200) {
    color = '緑';
  } else if (difficulty < 1600) {
    color = '水';
  } else if (difficulty < 2000) {
    color = '青';
  } else if (difficulty < 2400) {
    color = '黄';
  } else {
    color = '橙';
  }

  return color;
}