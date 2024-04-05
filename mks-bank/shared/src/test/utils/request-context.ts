interface Context {
    url: string
    body?: object
    query?: object
    params?: object
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const getRequestContext = (context: Context) => {
    const requestContext = {
        body: JSON.stringify(context.body),
        query: JSON.stringify(context.query),
        params: JSON.stringify(context.params),
        method: context.method ?? 'GET',
        headers: {
            'content-type': 'application/json'
        },
    }

    return new Request(context.url, requestContext)
}