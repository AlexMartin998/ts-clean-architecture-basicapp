export class CreateTodoDto {
  
  // // private to avoid creating instances and use in static methods
  private constructor(public readonly text: string) {}


  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    // aqui controlo lo q me envian. Solo uso lo q necesito y asi me protejo aun mas
    const { text } = props;
    if ( !text || text.length === 0 ) return ['Text property is required', undefined];
    
    return [undefined, new CreateTodoDto(text)];
  }
}
