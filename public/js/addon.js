/* App frontend script */
export function getIssuesOfCurrentUser() {
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
