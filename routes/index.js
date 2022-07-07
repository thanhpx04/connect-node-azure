export default function routes(app, addon) {
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  app.get("/main", (req, res) => {
    const { issueKey } = req.query;
    getIssueSummary(addon, req, issueKey).then((data) => {
      res.render("main.jsx", {
        issueKey: issueKey,
        data: data,
      });
    });
  });

  async function getIssueSummary(addon, req, issueKey) {
    return new Promise((resolve, reject) => {
      var httpClient = addon.httpClient(req);
      httpClient.get(
        `/rest/api/2/issue/${issueKey}/changelog`,
        function (err, res, body) {
          var listHistoryStoryPoint = JSON.parse(body).values.filter(
            (history) =>
              history.items.some((item) => item.field === "Story Points")
          );
          var newestStoryPoint = getNewestHistoryStatus(listHistoryStoryPoint);
          resolve(newestStoryPoint.toString);
        }
      );
    });
  }

  const getNewestHistoryStatus = (listHistoryStoryPoint) => {
    // array length 0 or 1
    var newestStoryPoint = listHistoryStoryPoint[0];
    // array length bigger than 1
    if (listHistoryStoryPoint.length > 1) {
      // new array avoid Mutation in JavaScript
      const listStatusOrderedCreatedDates = [...listHistoryStoryPoint].sort(
        function (current, next) {
          return Date.parse(next.created) - Date.parse(current.created);
        }
      );
      newestStoryPoint = listStatusOrderedCreatedDates[0];
    }

    return newestStoryPoint;
  };

  // Add additional route handlers here...
}
