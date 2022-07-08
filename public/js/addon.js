/* App frontend script */
function getIssuesOfCurrentUser() {
  AP.context.getContext().then(
      response => {
        let issueKey;
debugger;
        issueKey = response.jira.issue.key;
        if(issueKey){
            AP.request(`/rest/api/2/issue/${issueKey}/changelog`)
            .then(res => {
              debugger;
                var listHistoryStatus = JSON.parse(res.body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
                var newestStatus = getNewestHistoryStatus(listHistoryStatus);
                var curentStoryPoint = newestStatus.items.find((item) => {
                  return item.field === "Story Points";
                });
                debugger;
                displayData(curentStoryPoint.toString);
            })
            .catch(err => console.log('Request Failed', err));
        }
      }
  );
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
    '<p class="subtitle">>Current status: ' + data.value + "</p>",
    "</div>"
  );

  let htmlString = template.join("");
  element.innerHTML = htmlString;
}
