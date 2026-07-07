class BadRequest extends Error {
    constructor(status , message) {
        super();
        this.status = status
        this.name = "Bad Request"
        this.message = message
    }
}

class ConfilctError extends Error {
    constructor(status , message) {
        super();
        this.status = status
        this.name = "Confilct"
        this.message = message
    }
}


class NotFound extends Error {
    constructor( status , message ) {
        super();
        this.status = status
        this.name = "Not Found"
        this.message = message
    }
}
export { BadRequest , ConfilctError , NotFound };