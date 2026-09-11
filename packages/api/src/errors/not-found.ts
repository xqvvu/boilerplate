export const notFound = {
  end(res: ServerResponse) {
    const data = JSON.stringify({
      code: "NOT_FOUND",
      message: "the route not found",
    });
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  },

  error: {
    NOT_FOUND: {
      message: "the resource was not found",
    },
  },
};
