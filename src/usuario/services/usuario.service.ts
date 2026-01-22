import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscarUsuario = await this.findByUsuario(usuario.usuario);

    if (buscarUsuario)
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscarUsuario = await this.findByUsuario(usuario.usuario);

    if (buscarUsuario && buscarUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.usuarioRepository.delete(id);
  }
}
