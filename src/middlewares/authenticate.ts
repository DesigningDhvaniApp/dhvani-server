import { NextFunction, Request, Response } from 'express';
import { Response403 } from '../utils/Response';
import { JwtToken } from '../utils/shared/JwttokenUtil';
import { MemberDao } from '../dbutils/member.dao';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    // check token exists or not
    if (!token) {
      return res.status(Response403.code).send('Unauthorized');
    }

    // decode the token
    const jwtToken = new JwtToken();
    const decode = await jwtToken.verifyToken(token);

    const memberDao = new MemberDao();
    const db_member = await memberDao.findByEmail(decode.userName);

    if (!db_member) {
      return res.status(Response403.code).send('Unauthorized');
    }
    if (!db_member.isAdmin) {
      return res.status(Response403.code).send("You don't have access");
    }
    req['user'] = db_member;
    next();
  } catch (error) {
    return res.status(401).send('TOKEN EXPIRED!');
  }
};
