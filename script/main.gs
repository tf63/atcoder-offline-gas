function myFunction() {
  var contest_name = 'abc284';
  var problem_idf = ['c', 'd'];

  saveContestPage(contest_name, problem_idf);
}

function saveContestPage(contest_name, problem_idf) {

  // AtCoder problemからdifficultyを取得
  var difficulties = getDifficulties(contest_name, problem_idf);

  // スクショの撮影
  for (let idf of problem_idf) {

    // 問題名の取得
    var problem_name = `${contest_name}_${idf}`;

    // notionにproblem_nameが存在したらスキップ
    if (notionExistData(problem_name)) {
      continue;
    }

    // 問題の色を取得
    var color = getColorFromDifficulty(difficulties[problem_name]);

    // 色に応じた保存先を設定
    var folder_id = COLOR_TO_DIR[color];

    // 問題ページの撮影
    var url = `https://atcoder.jp/contests/${contest_name}/tasks/${problem_name}?lang=ja`;
    var filename = `${problem_name}_problem.png`;
    takeScreenshot(url, filename, folder_id);
    console.log('save screenshot: ' + filename);console.log('url: ' + url);
    Utilities.sleep(10000);

    // 解説ページの撮影
    var url = getURLFromExplain(contest_name, problem_name);
    var filename = `${problem_name}_explain.png`;
    takeScreenshot(url, filename, folder_id);
    console.log('save screenshot: ' + filename);
    console.log('url: ' + url);
    Utilities.sleep(10000);

    // notion APIでデータを挿入
    notionPost(problem_name, color);
  }
}








