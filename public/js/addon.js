/* App frontend script */

async function getIssuesOfCurrentUser() {
  // get issue key
  const context = await AP.context.getContext();
  var issueKey = context.jira.issue.key;
  // global = issueKey;
  AP.request(`/rest/api/2/issue/${issueKey}/changelog`).then(res => {
    var listHistoryStatus = JSON.parse(res.body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
    var newestStatus = getNewestHistoryStatus(listHistoryStatus);
    var curentStoryPoint = newestStatus.items.find((item) => {
      return item.field === "Story Points";
    });
    var storyPoint = curentStoryPoint.toString;
    console.log(issueKey);
    console.log(storyPoint);
    updateStoryPoint(issueKey, storyPoint);
    displayData(storyPoint);
  })
  .catch(err => console.log('Request Failed', err));
}

async function updateStoryPoint(issueKey, storyPoint) {
  const responseGet = await fetch(`https://crmprm-reminder.azurewebsites.net/storypoint/${issueKey}`);
  const dataGet = await responseGet.json();
  // check existing data then update otherwise insert
  if (dataGet) {
    let bodyUpdate = {
      value: storyPoint
    };
    const responseUpdate = await fetch(`https://crmprm-reminder.azurewebsites.net/storypoint/${issueKey}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyUpdate),
      }
    );
    const dataPatch = await responseUpdate.json();
    console.log(dataPatch);
  } else {
    let bodyInsert = {
      value: storyPoint,
      issueKey: issueKey,
    };
    const responsePost = await fetch(`https://crmprm-reminder.azurewebsites.net/storypoint`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyInsert),
      }
    );
    const dataPost = await responsePost.json();
    console.log(dataPost);
  }
}

function getNewestHistoryStatus (listHistoryStatus) {
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
