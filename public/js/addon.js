/* App frontend script */
export function getIssuesOfCurrentUser() {
  AP.request(`/rest/api/2/issue/M4P-1/changelog`, {
    success: function (res) {
      let obj, result;

      debugger;
      obj = JSON.parse(res);
      console.log(obj);
      // result = obj.issues.map(issue => ({
      //     id: issue.id,
      //     key: issue.key,
      //     summary: issue.fields.summary,
      //     project: issue.fields.project.name
      // }));

      // loadTableData(result);
      // var listHistoryStoryPoint = JSON.parse(body).values.filter(
      //   (history) =>
      //     history.items.some((item) => item.field === "Story Points")
      // );
      // var newestStoryPoint = getNewestHistoryStatus(listHistoryStoryPoint);
      // var curentStoryPoint = newestStoryPoint.items.find((item) => {
      //   return item.field === "Story Points";
      // });
      // resolve(curentStoryPoint.toString);
    },
  });
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
