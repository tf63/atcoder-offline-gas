function notionPost(problem_name, color) {
  
  var url = API_NOTION + 'pages';

  var headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + TOKEN_NOTION,
    'Notion-Version': '2022-06-28',
  };

  var data = {
    'contest': {
      'type': 'title',
      'title': [
        {
          'type': 'text',
          'text': {
            'content': problem_name
          }
        }
      ]
    },
    'color': {
      'select': 
        {
              'name': color,
              'color': COLOR_TO_TAG[color]
        }
    },
    'status': {
      'select': 
        {
              'name': 'Not started',
              'color': 'gray'
        }
    }
  };

  var payload = {
    'parent': {
      'database_id': DATABASE_ID
    },
    'properties': data,
  };

  var options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(payload),
  };

  return UrlFetchApp.fetch(url, options);  
}

function notionGet(problem_name) {
  
  var url = API_NOTION + 'databases/' + DATABASE_ID + '/query';
  var headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + TOKEN_NOTION,
    'Notion-Version': '2022-06-28',
  };

  var options = {
    'method' : 'post',
    'headers' : headers,
  };

  return UrlFetchApp.fetch(url, options);  
}


function notionExistData(problem_name) {
  /*
    DBにproblem_nameが
      存在する: true,
      存在しない: false
  */
  var url = API_NOTION + 'databases/' + DATABASE_ID + '/query';
  var headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + TOKEN_NOTION,
    'Notion-Version': '2022-06-28',
  };s

  
  var payload = {
    'filter': {
      'property': 'contest',
      'title': {
        'equals': problem_name
      }
    }
  };

  var options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(payload),
  };

  var response = UrlFetchApp.fetch(url, options);
  var results = JSON.parse(response.getContentText())['results'];
  
  if (results.length > 0) {
    return true;
  } else {
    return false;
  }
}

function notionTest() {
  // notionPost
  // var response = notionPost('abc291_b', '灰');

  // notionGet
  // var response = notionGet('abc291_b');
  // var results = JSON.parse(response.getContentText())['results'];
  
  // for (let i = 0; i < results.length; i++) {

  //   // 良くない
  //   if (results[i]['properties']['status']['select'] != null) {
  //     var title = results[i]['properties']['contest']['title'][0]['text']['content'];
  //     var tag = results[i]['properties']['color']['select']['name'];
  //     var status = results[i]['properties']['status']['select']['name'];

  //     console.log(title + ' ' + tag + ' ' + status);
  //   } else {
  //     console.log('undefined');
  //   }
  // }

  // notionExistData
  // console.log(notionExistData('abc291_a'));
  // console.log(notionExistData('abc291_b'));
  // console.log(notionExistData('abc291_c'));
}


