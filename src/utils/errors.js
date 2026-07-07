class BadRequest extends Error {
    constructor(status , message) {
        super();
        this.status = status
        this.name = "Bad Request"
        this.message = message
    }
}

export { BadRequest }