import { Controller, Get } from '@nestjs/common';
import { AppService } from "src/app/app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    checkServer(): string {
      return this.appService.checkServer();
    }
}
