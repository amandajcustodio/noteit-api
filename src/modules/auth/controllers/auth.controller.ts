import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { LoginPayload } from "../models/login.payload";
import { TokenProxy } from "../models/token.proxy";
import { AuthService } from "../services/auth.service";

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(
    private readonly service: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiOkResponse({ type: TokenProxy })
  @ApiBody({ type: LoginPayload })
  public async login(@Req() request: Request): Promise<TokenProxy> {
    return await this.service.generateToken(request.user as UserEntity);
  }

}