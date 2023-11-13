export class CreatePollDto {
  constructor(
    public creator: string = '',
    public question: string = '',
    public tags: string[] = [],
    public options: string[] = [],
  ) {}
}
