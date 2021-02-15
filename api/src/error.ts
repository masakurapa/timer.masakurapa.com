export type errorResponse = {
    messages: string[];
};

export const makeErrorResponse = (msg: string): errorResponse => {
    return {messages: [msg]};
};
