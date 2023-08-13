import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { eventValidationSchema } from 'validationSchema/events';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEvents();
    case 'POST':
      return createEvent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEvents() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.event
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'event'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createEvent() {
    await eventValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.data_analysis?.length > 0) {
      const create_data_analysis = body.data_analysis;
      body.data_analysis = {
        create: create_data_analysis,
      };
    } else {
      delete body.data_analysis;
    }
    if (body?.promotion?.length > 0) {
      const create_promotion = body.promotion;
      body.promotion = {
        create: create_promotion,
      };
    } else {
      delete body.promotion;
    }
    if (body?.registration?.length > 0) {
      const create_registration = body.registration;
      body.registration = {
        create: create_registration,
      };
    } else {
      delete body.registration;
    }
    if (body?.session?.length > 0) {
      const create_session = body.session;
      body.session = {
        create: create_session,
      };
    } else {
      delete body.session;
    }
    if (body?.venue?.length > 0) {
      const create_venue = body.venue;
      body.venue = {
        create: create_venue,
      };
    } else {
      delete body.venue;
    }
    const data = await prisma.event.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
