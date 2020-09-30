import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {

  it('should display weak if the strength is 9', () => {

    let pipe = new StrengthPipe();

    expect(pipe.transform(9)).toEqual('9 (weak)');
  });

  it('should display strong if the strength is 10', () => {

    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
