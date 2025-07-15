const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  CREATED: "Created!",
  OK: "Success",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = StatusCode.OK,
    content = {},
    path = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.content = content;
    this.path = path;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message, content, path }) {
    super({ message, content, path });
  }
}

export class Created extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    content,
    path,
    options,
  }) {
    super({ message, statusCode, reasonStatusCode, content, path });
    this.options = options || {};
  }
}
