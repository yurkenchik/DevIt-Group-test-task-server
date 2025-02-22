import { HttpException, HttpStatus } from "@nestjs/common";

export class NotEnoughStockException extends HttpException {
    constructor() {
        super("Not enough stock", HttpStatus.BAD_REQUEST);
    }
}