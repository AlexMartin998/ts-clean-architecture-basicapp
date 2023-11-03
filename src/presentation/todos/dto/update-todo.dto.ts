export class UpdateTodoDto {

  // // private to avoid creating instances and use in static methods
  private constructor(
    readonly id: number,
    readonly text?: string,
    readonly completedAt?: Date
  ) {}


  // // upd only props that client wants and do Not delete data if the prop is not sent
  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }


  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    // aqui controlo lo q me envian. Solo uso lo q necesito y asi me protejo aun mas
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) {
      return ['ID must be a valid number'];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date')
        return ['CompletedAt must be a valid date'];
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }

}
