import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { RestDto, Sort } from '../../../common/dto/rest.dto';

@Injectable()
export class RestPipe implements PipeTransform<any> {
  async transform(value: any, { type, metatype }: ArgumentMetadata) {
    if (type === 'query') {
      console.log(value)
      const sort: Sort = {}
      if (value.sort) {
        const [sortField, sortDirectionStr] = value.sort.split(':')
        if (!sortField || !sortDirectionStr || !['asc', 'desc'].includes(sortDirectionStr)) {
          throw new BadRequestException('Sort have and incorrect format', { cause: new Error(), description: 'Some error description' })
        }
        const sortDirection = sortDirectionStr === 'desc' ? -1 : 1
        sort[sortField] = sortDirection
      }

      const normalizedQueryParams: RestDto = {
        limit: Math.max(0, Math.min(1000, Number(value.limit ?? 100))),
        skip: Math.max(0, Number(value.skip ?? 0)),
        sort: sort,
        restQuery: {}
      }
      return normalizedQueryParams;
    }
    return value
  }
}
