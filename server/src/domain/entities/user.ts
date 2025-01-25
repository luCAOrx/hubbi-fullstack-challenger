interface UserProps {
  name: string;
  email: string;
}

export class User {
  private _props: UserProps;
  public get props(): UserProps {
    return this._props;
  }

  public set props(value: UserProps) {
    this._props = value;
  }

  private constructor(props: UserProps) {
    this._props = props;
  }

  static create(props: UserProps): User {
    return new User(props);
  }
}
