import { Request, Response, NextFunction, response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // O middleware funciona assim:
  //  se o user não tiver authenticado  o app retorna um erro
  //  se o user estiver autenticado ele passa pra frente, usando o "next"

  //   pegando o token de auth dentro do headers
  const authToken = request.headers.authorization
  // verificando se o token é valido
  if (!authToken) {
    return response.status(401).json({
      statuserrorCode: 'token.invalid',
    })
  }

  //   Recebemos o token do cabeçalho: Bearer 12312323exemplo123

  // devemos fazer um slip para separar por espaços o Bearer do token em si:
  const [, token] = authToken.split(' ')

  //   verify = verifica se o token é o mesmo
  // retorna algumas info, o id do user
  // se o token for infalido ele lança uma ecessão entao usa try caty

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.user_id = sub

    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: 'token expired' })
  }
}
