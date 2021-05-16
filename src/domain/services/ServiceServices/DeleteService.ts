import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestDeleteServiceDTO } from '../dto';
import { DomainServiceResult } from '../types';

export default class DeleteService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(
    deleteServiceDTO: IRequestDeleteServiceDTO
  ): Promise<DomainServiceResult<Service['id']>> {
    try {
      const { data: serviceExists } = await this.serviceRepository.findById(
        deleteServiceDTO.id
      );

      if (!serviceExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum serviço cadastrado com o ID informado',
          },
        };
      }

      const repoResult = await this.serviceRepository.delete(
        deleteServiceDTO.id
      );

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error) {}
  }
}
