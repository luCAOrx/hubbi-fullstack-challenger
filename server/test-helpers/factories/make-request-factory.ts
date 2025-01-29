interface MakeRequestFactoryProps {
  url: string;
  method: string;
  headers: Headers;
  data?: object;
}

export class MakeRequestFactory {
  static async execute({
    url,
    method,
    headers,
    data,
  }: MakeRequestFactoryProps): Promise<Response> {
    return await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });
  }
}
