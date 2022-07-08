/* App frontend script */
// const fetch = require('node-fetch');

async function getIssuesOfCurrentUser() {
  // get issue key
  const context = await AP.context.getContext();
  issueKey = context.jira.issue.key;
  AP.request(`/rest/api/2/issue/${issueKey}`).then(res => {
    debugger;
      var listHistoryStatus = JSON.parse(res.body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
      var newestStatus = getNewestHistoryStatus(listHistoryStatus);
      var curentStoryPoint = newestStatus.items.find((item) => {
        return item.field === "Story Points";
      });
      var storyPoint = curentStoryPoint.toString;
      debugger;
      updateStoryPoint(storyPoint);
      displayData(storyPoint);
  })
  .catch(err => console.log('Request Failed', err));
}

const updateStoryPoint = (storyPoint) => {
  console.log();
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
