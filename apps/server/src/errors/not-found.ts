export const notFound = {
  end(res: ServerResponse) {
    const data = JSON.stringify({ message: "not found" });

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    // res.setHeader("X-Request-Id", crypto.randomUUID());
    res.end(data);
  },
};
