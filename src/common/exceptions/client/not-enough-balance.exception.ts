import { HttpException, HttpStatus } from "@nestjs/common";

export class NotEnoughBalanceException extends HttpException {
    constructor() {
        super("Not enough balance", HttpStatus.BAD_REQUEST);
    }
}