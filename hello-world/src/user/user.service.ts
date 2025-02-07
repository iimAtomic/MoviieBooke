import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, surname } = registerDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException("L'email est déjà utilisé");
    }

    return await this.userModel.create({ email, password, name, surname });
  }

  async login(loginDto: LoginDto) {
    const { email } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }
    const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { access_token: token };
  }
}
