

import { PB } from './lib/pb.server';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = PB;
    const response = await resolve(event);
    return response;
};