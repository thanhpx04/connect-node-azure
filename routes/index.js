export default function routes(app, addon) {
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

    app.get("/main", addon.authenticate(), (req, res) => {
      const { issueKey } = req.query;
        res.render("main.hbs", {
          issueKey: issueKey
        });
    });

    // Add additional route handlers here...
}
