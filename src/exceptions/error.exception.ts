import { HttpException, HttpStatus } from '@nestjs/common';

export const errorMessages = {
  createUserValidateFail: {
    errno: 101001,
    message: '创建用户验证失败',
  },
  createUserAlreadyExists: {
    errno: 101002,
    message: '该邮箱已被注册，请直接登录',
  },
};

export class ErrorException extends HttpException {
  constructor(
    private readonly errorType: keyof typeof errorMessages,
    private readonly errors?: any,
  ) {
    super(errorType, HttpStatus.BAD_REQUEST);
  }

  getErrorCode(): number {
    const { errno } = errorMessages[this.errorType];
    return errno;
  }

  getErrors(): any {
    const errorObj = {};
    this.errors?.forEach((error) => {
      const { property, constraints } = error;
      const [[key, value]] = Object.entries(constraints);
      errorObj['code'] = 'invalid';
      errorObj['rule'] = key;
      errorObj['message'] = value;
      errorObj['field'] = property;
    });
    return errorObj;
  }
}
