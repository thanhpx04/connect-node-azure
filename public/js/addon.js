/* App frontend script */
import fetch from 'node-fetch';
// var global;
async function getIssuesOfCurrentUser() {
  // get issue key
  const context = await AP.context.getContext();
  var issueKey = context.jira.issue.key;
  debugger;
  // global = issueKey;
  AP.request(`/rest/api/2/issue/${issueKey}/changelog`).then(res => {
    debugger;
    var listHistoryStatus = JSON.parse(res.body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
  //   var listHistoryStatus = [
  //     {
  //         "id": "10184",
  //         "author": {
  //             "self": "https://thanhpx04.atlassian.net/rest/api/2/user?accountId=557058%3Aae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "accountId": "557058:ae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "avatarUrls": {
  //                 "48x48": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "24x24": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "16x16": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "32x32": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png"
  //             },
  //             "displayName": "Thanh Pham",
  //             "active": true,
  //             "timeZone": "Asia/Bangkok",
  //             "accountType": "atlassian"
  //         },
  //         "created": "2022-07-07T16:54:34.393+0700",
  //         "items": [
  //             {
  //                 "field": "Story Points",
  //                 "fieldtype": "custom",
  //                 "fieldId": "customfield_10028",
  //                 "from": null,
  //                 "fromString": null,
  //                 "to": null,
  //                 "toString": "2"
  //             }
  //         ]
  //     },
  //     {
  //         "id": "10185",
  //         "author": {
  //             "self": "https://thanhpx04.atlassian.net/rest/api/2/user?accountId=557058%3Aae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "accountId": "557058:ae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "avatarUrls": {
  //                 "48x48": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "24x24": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "16x16": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "32x32": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png"
  //             },
  //             "displayName": "Thanh Pham",
  //             "active": true,
  //             "timeZone": "Asia/Bangkok",
  //             "accountType": "atlassian"
  //         },
  //         "created": "2022-07-07T16:59:16.808+0700",
  //         "items": [
  //             {
  //                 "field": "Story Points",
  //                 "fieldtype": "custom",
  //                 "fieldId": "customfield_10028",
  //                 "from": null,
  //                 "fromString": "2",
  //                 "to": null,
  //                 "toString": "6"
  //             }
  //         ]
  //     },
  //     {
  //         "id": "10186",
  //         "author": {
  //             "self": "https://thanhpx04.atlassian.net/rest/api/2/user?accountId=557058%3Aae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "accountId": "557058:ae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "avatarUrls": {
  //                 "48x48": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "24x24": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "16x16": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "32x32": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png"
  //             },
  //             "displayName": "Thanh Pham",
  //             "active": true,
  //             "timeZone": "Asia/Bangkok",
  //             "accountType": "atlassian"
  //         },
  //         "created": "2022-07-08T12:26:00.348+0700",
  //         "items": [
  //             {
  //                 "field": "Story Points",
  //                 "fieldtype": "custom",
  //                 "fieldId": "customfield_10028",
  //                 "from": null,
  //                 "fromString": "6",
  //                 "to": null,
  //                 "toString": "8"
  //             }
  //         ]
  //     },
  //     {
  //         "id": "10187",
  //         "author": {
  //             "self": "https://thanhpx04.atlassian.net/rest/api/2/user?accountId=557058%3Aae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "accountId": "557058:ae1e597e-ef2a-43c9-988f-336d01f5a75a",
  //             "avatarUrls": {
  //                 "48x48": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "24x24": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "16x16": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png",
  //                 "32x32": "https://secure.gravatar.com/avatar/5a949854bac40da2262aae3c5eb128d5?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTP-4.png"
  //             },
  //             "displayName": "Thanh Pham",
  //             "active": true,
  //             "timeZone": "Asia/Bangkok",
  //             "accountType": "atlassian"
  //         },
  //         "created": "2022-07-08T13:13:24.254+0700",
  //         "items": [
  //             {
  //                 "field": "Story Points",
  //                 "fieldtype": "custom",
  //                 "fieldId": "customfield_10028",
  //                 "from": null,
  //                 "fromString": "8",
  //                 "to": null,
  //                 "toString": "7"
  //             }
  //         ]
  //     }
  // ];
    var newestStatus = getNewestHistoryStatus(listHistoryStatus);
    var curentStoryPoint = newestStatus.items.find((item) => {
      return item.field === "Story Points";
    });
    var storyPoint = curentStoryPoint.toString;
    debugger;
    updateStoryPoint(issueKey, storyPoint);
    displayData(storyPoint);
  })
  .catch(err => console.log('Request Failed', err));
}

function updateStoryPoint (issueKey, storyPoint) {
  debugger;
  const bodyData = `{
    "value": "${storyPoint}"
  }`;
  debugger;
  const response = fetch(`node-api-dns.westeurope.cloudapp.azure.com:5000/storypoint/${issueKey}`, {
    method: 'PATCH',
    body: bodyData
  });
  debugger;
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
