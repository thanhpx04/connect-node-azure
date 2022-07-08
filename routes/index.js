export default function routes(app, addon) {
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

    app.get("/main", addon.authenticate(), (req, res) => {
      const { issueKey } = req.query;
      // getIssueSummary(addon, req, issueKey).then((summary) => {
        res.render("main.hbs", {
          issueKey: issueKey
        });
      // });
    });

    async function getIssueSummary(addon, req, issueKey) {
      return new Promise((resolve, reject) => {
        var httpClient = addon.httpClient(req);
        httpClient.get(`/rest/api/2/issue/${issueKey}/changelog`, function (err, res, body) {
          var listHistoryStatus = JSON.parse(body).values.filter(history => history.items.some(item => item.field === 'Story Points'));
          var newestStatus = getNewestHistoryStatus(listHistoryStatus);
          var curentStoryPoint = newestStatus.items.find((item) => {
            return item.field === "Story Points";
          });
          resolve(curentStoryPoint.toString);
        });
      });
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
    
    const calculateMillisecond = (historyStatus) => {
      if (historyStatus) {
        var difMillisecond = new Date() - new Date(historyStatus.created); // milliseconds between now & newestStatus
        var difDays = Math.floor(difMillisecond / 86400000); // days
        var difHours = Math.floor((difMillisecond % 86400000) / 3600000); // hours
        var difMinutes = Math.round(((difMillisecond % 86400000) % 3600000) / 60000); // minutes
        var curentStatus = historyStatus.items.find((item) => {
          return item.fieldId === "status";
        });
        return {
          status: curentStatus.toString,
          days: difDays,
          hours: difHours,
          minutes: difMinutes
        };
      } else return null;
    }

    // Add additional route handlers here...
}
