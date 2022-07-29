import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
    required: true,
  })
  id: string;

  //id같은 경우는 Cat class에서 정의가 되어있지는 않지만
  //그래도 model을 사용할때 mongoose에서 자동으로
  //id를 부여해준다.
}
