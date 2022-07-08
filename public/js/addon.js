/* App frontend script */
// const fetch = require('node-fetch');
var global;
async function getIssuesOfCurrentUser() {
  // get issue key
  const context = await AP.context.getContext();
  var issueKey = context.jira.issue.key;
  debugger;
  global = issueKey;
  AP.request(`/rest/api/2/issue/${issueKey}/changelog`).then(res => {
    debugger;
      var listHistoryStatus = JSON.parse(res.body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
      var newestStatus = getNewestHistoryStatus(listHistoryStatus);
      var curentStoryPoint = newestStatus.items.find((item) => {
        return item.field === "Story Points";
      });
      var storyPoint = curentStoryPoint.toString;
      debugger;
      updateStoryPoint(global, storyPoint);
      displayData(storyPoint);
  })
  .catch(err => console.log('Request Failed', err));
}

const updateStoryPoint = (global, storyPoint) => {
  debugger;
  const bodyData = `{
    "value": ${storyPoint}
  }`;
  debugger;
  fetch(`node-api-dns.westeurope.cloudapp.azure.com:5000/storypoint/${global}`, {
    method: 'PATCH',
    body: bodyData
  }).then(response => {
    debugger;
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => {
      debugger;
      console.log(text);
    })
    .catch(err => console.error(err));
}

const getNewestHistoryStatus = (listHistoryStatus) => {
  // array length 0 or 1
  var newestStatus = listHistoryStatus[0];
  // array length bigger than 1
  if (listHistoryStatus.length > 1) {
    // new array avoid Mutation in JavaScript
    const listStatusOrderedCreatedDates = [...listHistoryStatus].sort(
      function (current, next) {
        return Date.parse(next.created) - Date.parse(current.created);
      }
    );
    newestStatus = listStatusOrderedCreatedDates[0];
  }
  return newestStatus;
}

function displayData(data) {
  let element = document.getElementById("storypoint");
  let template = [];

  // clean data before trigger again
  $("#storypoint").empty();
  template.push(
    '<div class="aui-message">',
    '<p class="subtitle">Story point: ' + data + "</p>",
    "</div>"
  );

  let htmlString = template.join("");
  element.innerHTML = htmlString;
}
