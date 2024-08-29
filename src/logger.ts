import { LoggerService } from "@nestjs/common";
import { utilities, WinstonModule, WinstonModuleOptions } from "nest-winston"
import { format, transports } from "winston";

export function createLogger(): LoggerService {
    
    const winstonOptions: WinstonModuleOptions = {
        transports: [
            new transports.Console({
                format: format.combine(
                    format.timestamp(),
                    utilities.format.nestLike()
                ),
                level: "debug"
            })
        ],

    }

    return WinstonModule.createLogger(winstonOptions)
}